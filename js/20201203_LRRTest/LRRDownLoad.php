<?php
    $JSON = file_get_contents('php://input');
    $date = json_decode($JSON, false);
    $readFileName = "LRRSaveData/LRRSaveData_".$date->year."-".$date->month."-".$date->date.".json";
    //echo $readFileName;
    readfile($readFileName);
?>
