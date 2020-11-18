<?php

function load_config($name, $schema){
	$config = new DOMDocument();
	$config->load($name);
	$res = $config->schemaValidate($schema);
	if ($res===FALSE){ 
	   throw new InvalidArgumentException("Check configuration file");
	} 		
	$data = simplexml_load_file($name);	
	$ip = $data->xpath("//ip");
	$name = $data->xpath("//name");
	$user = $data->xpath("//user");
	$password = $data->xpath("//password");	
	$conn_string = sprintf("mysql:dbname=%s;host=%s", $name[0], $ip[0]);
	$result = [];
	$result[] = $conn_string;
	$result[] = $user[0];
	$result[] = $password[0];
	return $result;
}

function check_user($name, $password){
	$res = load_config(dirname(__FILE__)."/configuration.xml", dirname(__FILE__)."/configuration.xsd");
	$db = new PDO($res[0], $res[1], $res[2]);
	$ins = "SELECT username, password FROM users WHERE username = '$name'";
	$resul = $db->query($ins);	
	if($resul->rowCount() === 1){	
		$resul2 = $resul->fetch();	
			if(password_verify($password,$resul2['password']))
				return $resul2['username'];
			else
				return FALSE;
	}else{
		return FALSE;
	}
}

function get_chats($username){
	$res = load_config(dirname(__FILE__)."/configuration.xml", dirname(__FILE__)."/configuration.xsd");
	$db = new PDO($res[0], $res[1], $res[2]);
	$ins = "SELECT `users`.`username`, `sent_to`.`id_dest_user` from `users` 
				INNER JOIN `message` on `users`.`code` = `message`.`origin_user_id`
    			INNER JOIN `sent_to` on `sent_to`.`id_msg` = `message`.`id_msg`
    			where `username` like '$username'
				group by `sent_to`.`id_dest_user`";
	$resul = $db->query($ins);
	$arrayCode = array();
	$arrayUsername = array();
	if($resul->rowCount() > 0){
		while($row = $resul->fetch())
			array_push($arrayCode, $row['id_dest_user']);
		foreach($arrayCode as $code){
			$tmp = get_username($code);
			if($tmp != FALSE)
				array_push($arrayUsername, $tmp);
			}
		
	}
	return $arrayUsername;
}

function get_username($code){
	$res = load_config(dirname(__FILE__)."/configuration.xml", dirname(__FILE__)."/configuration.xsd");
	$db = new PDO($res[0], $res[1], $res[2]);
	$ins = "SELECT `users`.`username` from `users` 
				where `users`.`code` like '$code' limit 1";
	$resul = $db->query($ins);
	if($resul->rowCount() === 1){
		$resul2 = $resul->fetch();
		return $resul2['username'];
	}
	else
		return FALSE;
}

 /*$stmt = $pdo->query("SELECT * FROM users");
while ($row = $stmt->fetch()) {
    echo $row['name']."<br />\n";
}*/


//Select para sacar elos usuarios destino de cada usuario
/*SELECT `users`.`username`, `sent_to`.`id_dest_user` from `users` 
	INNER JOIN `message` on `users`.`code` = `message`.`origin_user_id`
    INNER JOIN `sent_to` on `sent_to`.`id_msg` = `message`.`id_msg`
    where `username` like 'AdrianR'
	group by `sent_to`.`id_dest_user`;
*/













