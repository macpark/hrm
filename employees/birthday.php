<?php
session_start();
session_cache_limiter('nocache, must-revalidate');

require_once "/var/www/hrm/lib/dbconn.inc.php";
require "/var/www/hrm/lib/lunar2solar.inc.php";

$query_str = "SELECT emp_id, emp_name, birthday, islunar, SUBSTRING( birthday, 6, 5 ) birth_md
				FROM  tb_employee 
				WHERE SUBSTRING( birthday, 6, 5 ) >= SUBSTRING( NOW( ) , 6, 5 ) 
				ORDER BY SUBSTRING( birthday, 6, 5 )";
$result = que($query_str);
while ( $rs = mysql_fetch_array($result) ) {
	if ($rs[islunar] == '-') {
		//echo($rs[birth_md]. getdate()[year].preg_replace('/-/', '', $rs[birth_md]));
		$rs[birth_md] = lun2sol(getdate()[year].preg_replace('/-/', '', $rs[birth_md]));
	}
	$out[] = $rs;
}
//print_r($birthday);
//$out["birthday"] = $birthday;
//print_r($out);
$jsonStr = json_encode($out);

header( "Content-type: application/json; charset=utf-8" );
echo $jsonStr;
?>