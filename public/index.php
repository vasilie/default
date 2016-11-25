<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gulp assets generating test</title>
  <?php
   $style = file_get_contents (__DIR__ . "/assets/css/rev-manifest.json" );
   $json_style = json_decode($style, true);
   $link =  $json_style["main.css"];
   $script = file_get_contents (__DIR__ . "/assets/js/rev-manifest.json" );
   $script2 = file_get_contents (__DIR__ . "/assets/js/rev-manifest2.json" );
   $json_script = json_decode($script, true);
   $json_script2 = json_decode($script2, true);
  //  var_dump($script);
   $jslink1 =  $json_script["main.min.js"];
   $jslink2 =  $json_script2["app.min.js"];
  //  var_dump($jslink);
  ?>
  <link rel="stylesheet" href="assets/css/<?php echo $link; ?>" media="screen" title="no title">
</head>
<body>
  Hello!
</body>
<script type="text/javascript" src="assets/js/<?php echo $jslink1; ?>"></script>
<script type="text/javascript" src="assets/js/<?php echo $jslink2; ?>">

</script>
</html>
