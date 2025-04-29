<?php

    $lifeTime = 60*60*24*7; // 7 days
    session_set_cookie_params($lifeTime);

    session_start();

    $_SESSION['c_username'] = "";
    $_SESSION['c_loggedIn'] = false;

    include('connection.php');
    include('creation.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        
        $c_username = $_POST['c_username'];
        $c_password = $_POST['c_password'];

        $sql_s_customer_1 = "SELECT * FROM Customer WHERE Username='$c_username';";
        $sql_s_customer_2 = "SELECT Password FROM Customer WHERE Username='$c_username';";

        $result = $conn->query($sql_s_customer_1);

        if($result->num_rows > 0){
            $result2 = $conn->query($sql_s_customer_2);
            if($result2->num_rows > 0){
                $row = $result2->fetch_assoc();
                $hashedPassword = $row['Password'];
                if(password_verify($c_password, $hashedPassword)){
                    $_SESSION['c_username'] = $c_username;
                    $_SESSION['c_loggedIn'] = true;
                    setcookie("c_username", $c_username, time() + 86400, "/");
                    echo "1";
                }
                else{
                    echo "2";
                }
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