<?php

    include('connection.php');
    include('creation.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){

        $c_username = $_POST['c_username'];
        $c_password = $_POST['c_password'];
        
        $sql_s_customer = "SELECT * FROM Customer WHERE Username = '$c_username'";
        $result = $conn->query($sql_s_customer);

        if($result->num_rows > 0){
            echo "0";
        }

        else{
            $sql_s_customer = "SELECT COUNT(*) AS n_customer FROM Customer;";
            $result = $conn->query($sql_s_customer);
            $row = $result->fetch_assoc();
            $next_customer_id = $row['n_customer'] + 1;
            $customer_id = 'C'.str_pad($next_customer_id, 3, '0', STR_PAD_LEFT);
            $sql_i_customer = "INSERT INTO Customer (Customer_ID, Username, Password)
                                    VALUES(?, ?, ?);";
            $stmt = $conn->prepare($sql_i_customer);
            $stmt->bind_param("sss", $customer_id, $c_username, $c_password);
            $stmt->execute();
            echo "1";
        }
    }

?>