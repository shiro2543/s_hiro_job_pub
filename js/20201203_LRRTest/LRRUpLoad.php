<?php
    $JSON = file_get_contents('php://input');
    $date = json_decode($JSON, false)->calender;
    $outputFileName = "LRRSaveData/LRRSaveData_".$date->year."-".$date->month."-".$date->date.".json";
    file_put_contents($outputFileName, $JSON);
?>
