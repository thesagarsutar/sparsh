<?php

# load zipstream class
require 'zipstream/zipstream.php';

# get path to current file
$pwd = dirname(__FILE__);

# create new zip stream object
$zip = new ZipStream('css3_button.zip', array(
  'comment' => 'This zip file is generated from http://ui.sagarsutar.com'
));

$root_folder = 'css3_button/';

# common file options
$file_opt = array(
  # file creation time 
  'time'    => time(),

  # file comment
  'comment' => 'This zip file is generated from http://ui.sagarsutar.com',
);


# add css for iconic fonts
$files = array(
  'fonts/iconic-fonts/css/animation.css',
  'fonts/iconic-fonts/css/fontello-codes.css',
  'fonts/iconic-fonts/css/fontello-embedded.css',
  'fonts/iconic-fonts/css/fontello-ie7-codes.css',
  'fonts/iconic-fonts/css/fontello-ie7.css',
  'fonts/iconic-fonts/css/fontello.css'
);

# add files under folder "fonts/iconic-fonts/css/"
foreach ($files as $file) {
  # build absolute path and get file data
  $path = ($file[0] == '/') ? $file : "$pwd/$file";
  $data = file_get_contents($path);

  # add file to archive
  $zip->add_file($root_folder . 'fonts/iconic-fonts/css/' . basename($file), $data, $file_opt);
}

# add fonts for iconic fonts
$files = array(
  'fonts/iconic-fonts/font/fontello.eot',
  'fonts/iconic-fonts/font/fontello.svg',
  'fonts/iconic-fonts/font/fontello.ttf',
  'fonts/iconic-fonts/font/fontello.woff'
);

# add files under folder "fonts/iconic-fonts/font/"
foreach ($files as $file) {
  # build absolute path and get file data
  $path = ($file[0] == '/') ? $file : "$pwd/$file";
  $data = file_get_contents($path);

  # add file to archive
  $zip->add_file($root_folder . 'fonts/iconic-fonts/font/' . basename($file), $data, $file_opt);
}

# add meta data for iconic fonts
$files = array(
  'fonts/iconic-fonts/LICENSE.txt',
  'fonts/iconic-fonts/README.txt',
  'fonts/iconic-fonts/config.json',
  'fonts/iconic-fonts/demo.html'
);

# add files under folder "fonts/"
foreach ($files as $file) {
  # build absolute path and get file data
  $path = ($file[0] == '/') ? $file : "$pwd/$file";
  $data = file_get_contents($path);

  # add file to archive
  $zip->add_file($root_folder . 'fonts/iconic-fonts/' . basename($file), $data, $file_opt);
}

# get html
$files = array(
  'outputzip/index.html'
);

# add files under folder 'root folder'
$bodyBackgroundColor = 'background-color:' . stripslashes($_POST['bodyBackgroundColor']) . ';';
$markup = stripslashes($_POST['markup']);
foreach ($files as $file) {
  # build absolute path and get file data
  $path = ($file[0] == '/') ? $file : "$pwd/$file";
  $data = file_get_contents($path);

  #replace body background
  $data = str_replace("{{body-css}}", $bodyBackgroundColor, $data);

  #replace markup
  $data = str_replace("{{button-html}}", $markup, $data);

  # add file to archive
  $zip->add_file($root_folder . basename($file), $data, $file_opt);
}

# get css
$files = array(
  'outputzip/css/button.css'
);

# add files under folder 'css folder'
$buttonCSS = stripslashes($_POST['style']);
foreach ($files as $file) {
  # build absolute path and get file data
  $path = ($file[0] == '/') ? $file : "$pwd/$file";
  $data = file_get_contents($path);

  #append css to button.css
  $data .= $buttonCSS;

  # add file to css folder
  $zip->add_file($root_folder . 'css/' . basename($file), $data, $file_opt);
}

# finish archive
$zip->finish();

?>
