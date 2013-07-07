<?php
###by mac.park
	session_start();
	
	Header("Content-Type: text/plain; charset=UTF-8");
	// Date in the past
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	// always modified
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	// HTTP/1.1
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	// HTTP/1.0
	header("Pragma: no-cache");
	
	require_once "../lib/dbconn.inc.php";
	
	$id = urldecode($_POST["id"]);
	$pw = urldecode($_POST["pw"]);
	
	$mem_tbl = "tb_user";

	/* 사용자 등록여부 CHECK */
	$query_str = "select user from $mem_tbl where user = '$id'";

	$result = que($query_str);
	$result_row = mysql_num_rows($result);

	if (!$result_row) {
		echo "error: Wrong ID";
		exit;
	}
	
	/* PASSWORD CHECK */
	$query_str = " select user, nickname, email from $mem_tbl
					where user = '$id'
					and passwd = password('$pw')";

	$result = que( $query_str );
	$re = mysql_fetch_array($result);
  
	if ( $re[user] ) {
		
		$__user = $re[user];
		$__nick = $re[nickname];
		$__email = $re[email];
		session_register(__user);
		session_register(__nick);
		session_register(__email);
		
		//echo $__user. " <input type='button' class='button' value='LogOut' onClick=\"login_('logout');return false;\"/>";
		exit;
	} else {
		echo "error: Wrong PASSWORD!";
		exit;

	}
	mysql_close();


	


?>