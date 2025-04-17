<?php

    include('connection.php');
    include('creation.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        
        $c_username = $_POST['c_username'];
        $c_password = $_POST['c_password'];

        $sql_s_customer_1 = "SELECT * FROM Customer WHERE Username='$c_username';";
        $sql_s_customer_2 = "SELECT * FROM Customer WHERE Password='$c_password';";

        $result = $conn->query($sql_s_customer_1);

        if($result->num_rows > 0){
            $result2 = $conn->query($sql_s_customer_2);
            if($result2->num_rows > 0){
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