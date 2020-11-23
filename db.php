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


function get_conversation($user,$currentUser){
	$code_user=get_code($user);
	$code_current_user=get_code($currentUser);
	$arrayMsg = array();
	$res = load_config(dirname(__FILE__)."/configuration.xml", dirname(__FILE__)."/configuration.xsd");
	$db = new PDO($res[0], $res[1], $res[2]);
	//mensajes de current_user a user
	$ins = "SELECT `message`.`body`,`message`.`origin_user_id`, `message`.`time`, `sent_to`.`read`
			from message join sent_to 
			on `sent_to`.`id_msg` = `message`.`id_msg` 
			where `message`.`origin_user_id` like '$code_current_user' AND 
			`sent_to`.`id_dest_user`='$code_user'";
	//mensajes de current_user a user
	$ins2 = "SELECT `message`.`body`,`message`.`origin_user_id`, `message`.`time`, `sent_to`.`read` 
			from message join sent_to 
			on `sent_to`.`id_msg` = `message`.`id_msg` 
			where `message`.`origin_user_id` like '$code_user' AND 
			`sent_to`.`id_dest_user`='$code_current_user'";
	$resul = $db->query($ins);
	$resul2 = $db->query($ins2);
	if($resul->rowCount() > 0 || $resul2->rowCount() > 0){
		while($row = $resul->fetch()){
			$row['origin_user_id'] = get_username($row['origin_user_id']);
			array_push($arrayMsg, $row);
		}
		while($row = $resul2->fetch()){
			$row['origin_user_id'] = get_username($row['origin_user_id']);
			array_push($arrayMsg, $row);
		};
	//Update read state
	$ins3 = "UPDATE `sent_to` INNER JOIN `message`.`origin_user_id` 
			on `sent_to`.`id_msg` = `message`.`id_msg` 
			SET `sent_to`.`read`=1 WHERE `sent_to`.`read` = 0 AND 
			`sent_to`.`id_dest_user` LIKE '$code_user' AND 
			`message`.`origin_user_id` LIKE '$code_current_user'";
	$resul3 = $db->query($ins3);
		return $arrayMsg;
	}else{
		return FALSE;
	}	
}

function update_read($current_user, $user){
	$code_user=get_code($user);
	$code_current_user=get_code($currentUser);
	$res = load_config(dirname(__FILE__)."/configuration.xml", dirname(__FILE__)."/configuration.xsd");
	$db = new PDO($res[0], $res[1], $res[2]);
	$ins3 = "UPDATE `sent_to` INNER JOIN `message` 
			on `sent_to`.`id_msg` = `message`.`id_msg` 
			SET `sent_to`.`read`=1 
			WHERE `sent_to`.`read` = 0 AND 
			`sent_to`.`id_dest_user` LIKE '$code_current_user' AND 
			`message`.`origin_user_id` LIKE '$code_user'";
	$resul = $db->query($ins3);
	if($resul === TRUE)
		return TRUE;
	else 
		return FALSE;
}

function get_code($username){
	$res = load_config(dirname(__FILE__)."/configuration.xml", dirname(__FILE__)."/configuration.xsd");
	$db = new PDO($res[0], $res[1], $res[2]);
	$ins = "SELECT `users`.`code` from `users` 
				where `users`.`username` like '$username'";
	$resul = $db->query($ins);
	if($resul->rowCount() === 1){
		$resul2 = $resul->fetch();
		return $resul2['code'];
	}
	else
		return FALSE;
}


function send_message($current_user, $user,$body, $time){
	$code_user=get_code($user);
	$code_current_user=get_code($current_user);
	$res = load_config(dirname(__FILE__)."/configuration.xml", dirname(__FILE__)."/configuration.xsd");
	$db = new PDO($res[0], $res[1], $res[2]);
	$ins = "INSERT INTO `message`(`id_msg`, `body`, `origin_user_id`, `time`) VALUES
			(null,'$body', '$code_current_user', '$time')";
	$resul = $db->query($ins);
	if(!$resul){
		print_r($db->errorInfo());
		$db->rollBack();
		return FALSE;
	}
	
	$ins = "SELECT `id_msg` FROM `message` WHERE `body` LIKE '$body' and `origin_user_id` LIKE '$code_current_user' and `time` like '$time'";
	$resul = $db->query($ins);
	if($resul->rowCount() === 1){
		$resul2 = $resul->fetch();
		print_r($resul2) ;
		$resul3=$resul2['id_msg'];
		$ins = "INSERT INTO `sent_to`(`code_sent`, `id_msg`, `id_dest_user`, `read`) VALUES (null,'$resul3','$code_user',0)";
		$resul = $db->query($ins);
		if(!$resul){
			print_r($db->errorInfo());
			$db->rollBack();
			return FALSE;
		}
		else{
			return TRUE;
		}
	}
	else
		return FALSE;
	
	//$ins2 = "INSERT INTO `sent_to`(`code_sent`, `body`, `id_dest_user`, `ream`) VALUES
	//	SELECT id_msg FROM message WHERE body LIKE 'Lorem ipsum dolor sit amet' and origin_user_id LIKE 2;	(null,'$body', '$code_current_user', '$time')";
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













