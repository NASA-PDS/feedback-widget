
<?php
  //  if(isset($token) && !empty($token)) {
//	$responseData = json_decode($verifyResponse);
// var_dump($_POST);
//if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $secret = '6LfLCIgUAAAAACC7IgKTyoC3Yv3xoc7bK2QiV2rc';
  $response = $_POST['response'];
  $verifyURL = $url . '?secret=' . urlencode($secret) . '&response=' . urlencode($response);
  $verifyResponse = file_get_contents($verifyURL);
  $responseData = json_decode($verifyResponse);
//  $responseData = $verifyResponse;

// echo '';
var_dump($responseData);

 //   if ($responseData && $responseData->success && $responseData->action === $action) {
    if ($responseData && $responseData->action === $action) {
	return $responseData->score;
    } else {
  	return false;
    }
?>