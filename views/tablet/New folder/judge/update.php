<?php
$postdata = file_get_contents("php://input");
$file = fopen("../uploads/correction.json", "w");
fwrite($file, $postdata);
fclose($file);
