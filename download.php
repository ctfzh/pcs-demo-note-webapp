<?php
require_once('pcs.class.php');

$access_token = $_GET['access_token'];

$auth = array (
	'access_token' => $access_token,
);

$pcs = new BaiduPCS($auth);
$pcs->set_ssl(true);

$path = $_GET['path'];
$title = $_GET['title'];
$noteid = $_GET['noteid'];

if (!($data = $pcs->download_file($path))) {   
        echo json_encode(array ('content'=> $pcs->get_error_message()));
    }else {
        echo json_encode(array ('content'=> $data, 'title'=>$title, 'noteid'=>$noteid));
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