<?php

require_once('pcs.class.php');

$access_token = $_GET['access_token'];

$auth = array (
	'access_token' => $access_token,
);

$pcs = new BaiduPCS($auth);

$pcs->set_ssl(true);

$path = $_GET['path'];

$content = $_GET['content'];

$tilte = $_GET['title'];


if (!($data = $pcs->upload_file_by_content($content,$path,$tilte))) {   
    
        echo json_encode(array ('content'=> $pcs->get_error_message()));
    }else {
        echo json_encode(array ('content'=> $data));
    }

?>
