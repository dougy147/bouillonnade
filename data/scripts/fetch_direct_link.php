<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$url = file_get_contents("php://input");

if ($url) {
	/*
	    Security to avoid requests to anything
	    else than websites I have authorized.
	 */
    if (
	str_starts_with($url, "https://www.marmiton.org")  or
	str_starts_with($url, "https://marmiton.org")      or
	str_starts_with($url, "https://www.750g.com")      or
	str_starts_with($url, "https://750g.com")          or
	str_starts_with($url, "https://www.cuisineaz.com") or
	str_starts_with($url, "https://cuisineaz.com")
    )
    {
	$report = file_get_contents($url);
	header('Content-Type: text/plain');
	echo $report;
    } else {
	echo "No no no <|:^)";
    }
} else {
    echo "[INFO] Wasn't ordered to fetch anything, yet.";
}
?>
