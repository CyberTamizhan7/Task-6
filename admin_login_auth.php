<?php

    session_start();

    $_SESSION['username'] = "";
    $_SESSION['loggedIn'] = false;

    include('connection.php');
    include('creation.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $username = $_POST['username'];
        $password = $_POST['password'];
        $sql_s_admin1 = "SELECT * FROM Admin WHERE Username = '$username'";
        $sql_s_admin2 = "SELECT * FROM Admin WHERE Password = '$password'";
        $result1 = $conn->query($sql_s_admin1);
        if($result1->num_rows>0){
            $result2 = $conn->query($sql_s_admin2);
            if($result2->num_rows>0){
                $_SESSION['username'] = $username;
                $_SESSION['loggedIn'] = true;
                echo "1";
            }
            else{
                echo "2";
            }
        }
        else{
            echo "0";
        }
    }

?>