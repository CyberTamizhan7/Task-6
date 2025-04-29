<?php

    session_start();

    include('connection.php');

    if(isset($_COOKIE['a_username'])){
        header("Location: admin_panel.html");
        exit();
    }

    if(isset($_SESSION['username']) && isset($_SESSION['loggedIn'])){
        if($_SESSION['loggedIn'] == true){
            header("Location: admin_panel.html");
        }
        else{
            header("Location: admin_login_real.html");
        }
    }

    else{
        header("Location: admin_login_real.html");
    }

?>