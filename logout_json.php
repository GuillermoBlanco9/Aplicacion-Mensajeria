<?php
session_start();
if(isset($_SESSION['user']) || (isset($_SESSION['pass']))){	
    $_SESSION = array();
    session_destroy();
    echo "TRUE";
    return;
}else{
    echo  'FALSE';
    return;
}		

