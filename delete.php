<?php

require_once('pcs.class.php');

$access_token = $_GET['access_token'];

$auth = array (
	'access_token' => $access_token,
);

$pcs = new BaiduPCS($auth);

$pcs->set_ssl(true);

$path = $_GET['path'];


if (!($data = $pcs->delete_file($path))) {   
    
        echo json_encode(array ('content'=> $pcs->get_error_message()));
    }else {
        echo json_encode(array ('content'=> $data));
    }

?>
