<?php

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LAT&LNG TO ADDRESS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAddress($lat,$lng)
{
    $url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='.trim($lat).','.trim($lng).'&sensor=false';
    $json = @file_get_contents($url);
    $data=json_decode($json);
    $status = $data->status;
    if($status=="OK")
        return $data->results[0]->formatted_address;
    else
        return false;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADDRESS TO LAT&LNG
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLatLng($address)
{
    $url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' .
        urlencode($address) . '&sensor=true';
    $json = @file_get_contents($url);
    $data = json_decode($json);
    $status = $data->status;
    if ($status == "OK")
        return [
            "lat" => $data->results[0]->geometry->location->lat,
            "lng" => $data->results[0]->geometry->location->lng
        ];
    else
        echo false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TEST
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$lat= 26.754347; //latitude
$lng= 81.001640; //longitude
$resToAddress= getAddress($lat,$lng);
if($resToAddress)
    echo $resToAddress;
else
    echo "Not found";

echo "<hr>";


$address = 'Cannaught Place, New Delhi, India';
$resToLatLng= getLatLng($address);
if($resToLatLng)
    print_r ($resToLatLng);
else
    echo "Not found";

