<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$data = file_get_contents("php://input");
$url = "http://searxng:7555/search?q=" . $data . "%20site%3Ahttps%3A//www.750g.com/%20OR%20site%3Ahttps%3A//www.marmiton.org/%20OR%20site%3Ahttps%3A//www.cuisineaz.com/";

if ($data) {
    $report = file_get_contents($url);
    header('Content-Type: text/plain');
    /* Reducing body to avoid various exploits from client */
    /* Should only report http links between "quotes" */
    if (preg_match('/<div id="urls" role="main">(.*?)<nav id="pagination" role="navigation">/s', $report, $matches)) {
	$report = $matches[1];
	echo $report;
    } else {
	echo "[ERROR] Engine could not make a valid search.";
    }
} else {
    echo "[INFO] Wasn't ordered to fetch anything, yet.";
}
?>
