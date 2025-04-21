<?php

    session_start();

    include('connection.php');

    if(isset($_SESSION['c_username']) && isset($_SESSION['c_loggedIn'])){
        if($_SESSION['c_loggedIn'] == true){
            header("Location: customer_panel.html");
        }
        else{
            header("Location: customer_login_real.html");
        }
    }

    else{
        header("Location: customer_login_real.html");
    }

?>