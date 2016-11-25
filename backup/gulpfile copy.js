// /////////////////////////////////////////////////
// Required
// /////////////////////////////////////////////////

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    browserSync = require("browser-sync"),
    concat = require("gulp-concat"),
    concat = require("gulp-concat"),
    rev = require('gulp-rev'),
    gutil = require('gulp-util'),
    rimraf = require('rimraf'),
    revOutdated = require('gulp-rev-outdated'),
    path = require('path'),
    through = require('through2'),
    reload = browserSync.reload;


function cleaner() {
    return through.obj(function(file, enc, cb){
        rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}
// /////////////////////////////////////////////////
// Clean Task
// /////////////////////////////////////////////////

gulp.task('clean', function() {
    gulp.src( ['public/assets/**/*.*'], {read: false})
        .pipe( revOutdated(1) ) // leave 1 latest asset file
        .pipe( cleaner() );
    return;
});



// /////////////////////////////////////////////////
// Scripts Task
// /////////////////////////////////////////////////

gulp.task("scripts",function(){
    gulp.src([
      "public/js/main.js",
      "public/js/mail.js",
    ])
    .pipe(concat('main.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/assets/js'))  // write manifest to build dir
    .pipe(reload({stream:true}));
    gulp.src([
      "public/js/app1.js",
      "public/js/app2.js",
    ])
    .pipe(concat('app.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(rev.manifest({merge:true}))
    .pipe(gulp.dest('public/assets/js'))  // write manifest to build dir
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Styles Task
// /////////////////////////////////////////////////

gulp.task("styles",function(){
    gulp.src("public/sass/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      style:"compressed"
    }))
    .pipe(rev())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// HTML Task
// /////////////////////////////////////////////////

gulp.task("html", function(){
    gulp.src("app/**/*.html")
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Browser-Sync Task
// /////////////////////////////////////////////////
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir:"./public/"
    }
  })
});

// /////////////////////////////////////////////////
// Watch Task
// /////////////////////////////////////////////////

gulp.task("watch",function(){
  gulp.watch("public/js/**/*.js",['scripts','clean']);
  gulp.watch("public/sass/**/*.scss",['styles','clean']);
  // gulp.watch("public/assets/css/**/*.css",['rev']);
  gulp.watch("public/**/*.html",['html']);
});



// /////////////////////////////////////////////////
// Rev task
// /////////////////////////////////////////////////

gulp.task('rev', () =>
    // by default, gulp would pick `assets/css` as the base,
    // so we need to set it explicitly:
    gulp.src(['app/assets/css/*.css', 'app/assets/js/*.js'], {base: 'assets'})
        .pipe(gulp.dest('build/assets'))  // copy original assets to build dir
        .pipe(rev())
        .pipe(gulp.dest('build/assets'))  // write rev'd assets to build dir
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/assets'))  // write manifest to build dir
        .pipe(reload({stream:true}))
);

// /////////////////////////////////////////////////
// Default Task
// /////////////////////////////////////////////////
gulp.task("default",[ 'scripts','styles', 'html', 'browser-sync', 'watch', 'rev', 'clean']);
