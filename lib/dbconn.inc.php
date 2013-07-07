<?php
##### DB 정보 #########
$hostname = "localhost";
$username = "root";
$password = "knbit.";
$db_name = "hrm";

########## 데이터베이스 서버에 연결한다. ##########
$dbconn = mysql_connect($hostname, $username, $password) or die("Fail to connect!");

mysql_query("set session character_set_connection=utf8;");
mysql_query("set session character_set_results=utf8;");
mysql_query("set session character_set_client=utf8;");

########## 서버내에서 작업대상 데이터베이스를 선택한다. ##########
$status = mysql_select_db($db_name);
if (!$status) {
	$err_no = mysql_errno();
	$err_msg = mysql_error();
	$error_msg = "ERROR CODE " . $err_no . " : $err_msg";
	echo("$error_msg");
	exit;
}


function que($query) {
	$result = mysql_query($query);
	if (!$result) {
		$err_no = mysql_errno();
		$err_msg = mysql_error();
		$error_msg = "ERROR CODE " . $err_no . " : $err_msg";
		echo("$error_msg");
		exit;
	}else {
		return $result;
	}
}

?>