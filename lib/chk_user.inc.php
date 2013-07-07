<?php
	require_once "/home/macgyver/let.knowur.info/lib/dbconn.inc.php";
	
	$query = " select user, nickname, email from knowur_user
					where user = '$_GET[user]'";

	$result = que( $query );
	$re = mysql_fetch_array($result);
	
	if (!$re['user']) {
		echo "<script>
						$('info').innerHTML = '잘못된 URL입니다.';
						$('info').style.display='block';
						dojo.html.setOpacity($('outer'), 0.2);
						setTimeout('history.back()',2000);
					</script>";
		exit;
	}

	if ($_SESSION['__user'] == $re['user']) {
		$__owner = true;
	}else {
		$__owner = false;
	}

?>