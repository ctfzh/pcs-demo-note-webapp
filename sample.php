<?php
require_once('pcs.class.php');

$access_token = $_GET['access_token'];

$auth = array (
	'access_token' => $access_token,
);

$pcs = new BaiduPCS($auth);


$path = $_GET['path'];

$a=array("content"=>"asdfsafsafsaf");

if (!($data = $pcs->download_file($path))) {   
        $arr = array ('content'=> $pcs->get_error_message());
        echo json_encode($data);
    }else {
        echo json_encode($a);
    }


///* 查询配额空间和已使用空间 */
//if (!($data = $pcs->info_quota())) {
//	var_dump($pcs->get_error_message());
//	return;
//} else {
//    echo json_encode($data);
//}
//
//echo "\n";
//
///* 创建目录 */
//if (!($data = $pcs->create_dir($my_dir))) {
//	var_dump($pcs->get_error_message());
//	return;
//} else {
//    echo json_encode($data);
//}
//
//echo "\n";
//
///* 查看目录信息 */
//if (!($data = $pcs->meta_file($my_dir))) {
//	var_dump($pcs->get_error_message());
//	return;
//} else {
//    echo json_encode($data);
//}
//
//echo "\n";
//
///* 删除目录 */
//if (!($data = $pcs->delete_file($my_dir))) {
//	var_dump($pcs->get_error_message());
//	return;
//} else {
//    echo json_encode($data);
//}
//
//echo "\n";

?>