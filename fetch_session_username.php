<?php

    session_start();

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $code = $_POST['code'];
        if($code=='C'){
            if(isset($_SESSION['c_username'])){
                echo $_SESSION['c_username'];
            }
            else{
                echo "Customer Username Not Found!";
            }
        }
        else if($code=='A'){
            if(isset($_SESSION['username'])){
                echo $_SESSION['username'];
            }
            else{
                echo "Admin Username Not Found!";
            }
        }
    }
?>