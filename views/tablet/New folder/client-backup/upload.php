<?php
$picFileName = "../uploads/" . $_POST['hash'] . ".img";
$picFile = fopen($picFileName, "w");
fwrite($picFile, $_POST['image']);
$image = imagecreatefrompng($_POST['image']);
fclose($picFile);
