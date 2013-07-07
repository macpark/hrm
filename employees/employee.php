<?php
session_start();
session_cache_limiter('nocache, must-revalidate');

require_once "/var/www/hrm/lib/dbconn.inc.php";
require "/var/www/hrm/lib/lunar2solar.inc.php";

if ($_GET[emp_id] == 'employeesList') {
	$query_str = "select emp_id, emp_name, duty_code, duty_name, pos_code, pos_name, dept_code, dept_name, email, mobile, join_date, birthday, islunar, SUBSTRING( birthday, 6, 5 ) birth_md from tb_employee";
	$result = que($query_str);

	while ( $rs = mysql_fetch_array($result) ) {
		if (date("md") <= $rs[birth_md]) {			
			if ($rs[islunar] == '-') {
				//echo($rs[birth_md]. getdate()[year].preg_replace('/-/', '', $rs[birth_md]));
				$rs[birth_md] = lun2sol(date("Y").preg_replace('/-/', '', $rs[birth_md]));
			}
			if (date('md', mktime(0, 0, 0, date("m")  , date("d")+30, date("Y"))) < $rs[birth_md]) {
				$rs[birth_md] = 'Z';
			}
		}else {
			$rs[birth_md] = 'Z';
		}
		$out[] = $rs;
	}

}else {
	//$emp = array();
	$query_str = "select e.*, c.code_name recruit_type_str 
					from tb_employee e
						join tb_code c
							on e.recruit_type = c.code and c.cat='recruit_type'
					where e.emp_id='". $_GET[emp_id] ."'";
	$result = que($query_str);

	while ( $rs = mysql_fetch_array($result) ) {
	    $out["emp"] = $rs;
	}
}

$jsonStr = json_encode($out);

header( "Content-type: application/json; charset=utf-8" );
echo $jsonStr;
//print_r($out);
?>