<?php

$db = new mysqli('localhost', 'root', '', 'simpic_cm');
if ($db->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
}

$configFile = fopen('app/config.json', 'r') or die('Unable to open file!');
$tiles = json_decode(fread($configFile, filesize('app/config.json')))->tiles;
fclose($configFile);
// var_dump($tiles);

$arr = [];
for ($i = 0; $i < sizeof($tiles); $i++) {
  $sql = '
    SELECT latest
    FROM tablet
    WHERE hash = "'. $tiles[$i]->hash .'"
  ';
  if (!$result = $db->query($sql)){
      die('There was an error running the query [' . $db->error . ']');
  }
  if ($result->num_rows == 0) {
    $picName = $tiles[$i]->hash . '_fail';
  } else {
    $row = $result->fetch_assoc();
    $picName = $tiles[$i]->hash . '_' . $row['latest'];
  }
  $arr[$i] = array(
    'picName' => $picName,
    'teamName' => $tiles[$i]->team
  );
}
ksort($arr);
echo json_encode($arr);
