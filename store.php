<?php

#ini_set("display_errors", 1);
#ini_set('display_startup_errors', 1);
ini_set("display_errors", 0);
error_reporting(E_ALL);

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

// sanity check for file format
if (substr($request->fname_post ?? '', -4) !== ".txt") {
    die("Failed: wrong format.");
}

$user_data = $request->results_post;

// "/data/" should be replaced with whatever folder you have at the server root
$path = $_SERVER['DOCUMENT_ROOT'] . "/../data/";
$file_name = $path .  $request->fname_post;

$outcome = file_put_contents($file_name, $user_data, FILE_APPEND | LOCK_EX);

// some basic checks for failure
if ($outcome > 50) {
    echo "success";
} else if (is_file($file_name) === FALSE) {
    echo "Failed to save file! (" . $outcome . "x" . $request->fname_post . ")";
} else {
    echo "Failed to save full data! (" . $outcome . "x" . $request->fname_post . ")";
}
