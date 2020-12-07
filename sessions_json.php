<?php
function check_session(){
	session_start();
	if(!isset($_SESSION['user']) || (!isset($_SESSION['pass']))){	
		return true;
	}else{
		return false;
	}		
}
