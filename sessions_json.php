<?php
function check_session(){
	session_start();
	if(!isset($_SESSION['user'])){	
		return false;
	}else return true;		
}
