<?php

function map($value, $fromLow, $fromHigh, $toLow, $toHigh) {
    $fromRange = $fromHigh - $fromLow;
    $toRange = $toHigh - $toLow;
    $scaleFactor = $toRange / $fromRange;

    // Re-zero the value within the from range
    $tmpValue = $value - $fromLow;
    // Rescale the value to the to range
    $tmpValue *= $scaleFactor;
    // Re-zero back to the to range
    return $tmpValue + $toLow;
}

$json = file_get_contents('php://input');
$helium = json_decode($json, true);

$url = 'http://127.0.0.1:5055/?id='.$helium["deviceInfo"]["deviceName"];
$url .='&lat='.$helium["object"]["latitude"];
$url .='&lon='.$helium["object"]["longitude"];
$url .='&rssi='.$helium["rxInfo"][0]["rssi"];
$url .='&hotspot='.$helium["rxInfo"][0]["metadata"]["gateway_name"];

if (isset($helium["object"]["BatV"])) {
    $battery = $helium["object"]["BatV"];
    $url .='&akkuspannung='.$battery;
    $battery = map($battery, 2.9, 4.0, 0, 100);
    $battery = round($battery, 0);
    $url .='&batt='.$battery;
}

if (isset($helium["object"]["battery"])) {
    $battery = $helium["object"]["battery"];
    $url .='&akkuspannung='.$battery;
    $battery = map($battery, 2.9, 3.6, 0, 100);
    $battery = round($battery, 0);
    $url .='&batt='.$battery;
}

if (isset($helium["object"]["accuracy"])) {
    $url .='&accuracy='.$helium["object"]["accuracy"];
}

if (isset($helium["object"]["temperature"])) {
    $url .='&temperature='.$helium["object"]["temperature"];
}

if (isset($helium["object"]["gnssFix"])) {
    $gnssFix = var_export($helium["object"]["gnssFix"], true);
    $url .='&valid='.$gnssFix;
}

$ctx = stream_context_create(array('http'=>
    array(
        'timeout' => 3,  //1200 Seconds is 20 Minutes
    )
));

$response = file_get_contents($url, false, $ctx);

if ($response === false) {
    $error = error_get_last();
    if ($error['type'] === E_WARNING) {
        // nope
    } else {
        // nope
    }
}

header("Content-Type: application/json; charset=utf-8");
http_response_code(200);
print($url . ",success");
return;
?>
