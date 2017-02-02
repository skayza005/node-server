<?php
$image = imagecreatefrompng($_POST['image']);
imagealphablending($image, false);
imagesavealpha($image, true);

$db = new mysqli('localhost', 'root', '', 'simpic_cm');
if ($db->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
}

$sql = '
    SELECT *
    FROM tablet
    WHERE hash = "'. $_POST['hash'] .'"
';
if (!$result = $db->query($sql)){
    die('There was an error running the query [' . $db->error . ']');
}

if ($result->num_rows === 0) {

  $sql = '
    INSERT INTO tablet (hash, latest)
    VALUES ("'. $_POST['hash'] .'", 0)
  ';
  if (!$db->query($sql)){
      die('There was an error running the query [' . $db->error . ']');
  }

  $picName = $_POST['hash'] . "_0";

} else {

  $sql = '
    UPDATE tablet
    SET latest = latest + 1
    WHERE hash = "'. $_POST['hash'] .'"
  ';
  if (!$db->query($sql)){
      die('There was an error running the query [' . $db->error . ']');
  }

  $row = $result->fetch_assoc();
  $picName = $_POST['hash'] . "_" . (string)($row['latest'] + 1);
}

imagepng($image, '../uploads/'. $picName .'.png');
