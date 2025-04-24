<?php

    session_start();

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){

        if(isset($_SESSION['c_username'])){
            $customer_username = $_SESSION['c_username'];
        }
        else{
            $customer_username = "NN";
        }

        $s_name = $_POST['s_name'];
        $s_age = $_POST['s_age'];
        $s_gender = $_POST['s_gender'];
        $s_phone = $_POST['s_phone'];
        $s_email = $_POST['s_email'];
        $s_country = $_POST['s_country'];
        $s_state = $_POST['s_state'];
        $s_city = $_POST['s_city'];
        $s_village = $_POST['s_village'];
        $s_street = $_POST['s_street'];
        $s_house_no = $_POST['s_house_no'];
        $s_pin_code = $_POST['s_pin_code'];

        $b_name = $_POST['b_name'];
        $b_age = $_POST['b_age'];
        $b_gender = $_POST['b_gender'];
        $b_phone = $_POST['b_phone'];
        $b_email = $_POST['b_email'];
        $b_country = $_POST['b_country'];
        $b_state = $_POST['b_state'];
        $b_city = $_POST['b_city'];
        $b_village = $_POST['b_village'];
        $b_street = $_POST['b_street'];
        $b_house_no = $_POST['b_house_no'];
        $b_pin_code = $_POST['b_pin_code'];


        $a_sku_id = $_POST['a_sku_id'];
        $a_product_name = $_POST['a_product_name'];
        $a_category_name = $_POST['a_category_name'];
        $a_product_price = $_POST['a_product_price'];
        $a_quantity = $_POST['a_quantity'];

        $a_sku_id_ = json_decode($a_sku_id, true);
        $a_product_name_ = json_decode($a_product_name, true);
        $a_category_name_ = json_decode($a_category_name, true);
        $a_product_price_ = json_decode($a_product_price, true);
        $a_quantity_ = json_decode($a_quantity, true);

        $a_product_id = [];
        $a_category_id = [];
        
        for($i=0;$i<count($a_sku_id_);$i++){
            $product_name = $a_product_name_[$i];
            $product_name = mysqli_real_escape_string($conn, $product_name);
            $sql_s_product_id = "SELECT Product_ID FROM Products WHERE Name = '$product_name'";
            $result = $conn->query($sql_s_product_id);
            if($result->num_rows>0){
                $row = $result->fetch_assoc();
                $a_product_id[] = $row['Product_ID'];
            }
        }

        for($i=0;$i<count($a_sku_id_);$i++){
            $category_name = $a_category_name_[$i];
            $category_name = mysqli_real_escape_string($conn, $category_name);
            $sql_s_category_id = "SELECT Category_ID FROM Product_Categories WHERE Category = '$category_name'";
            $result2 = $conn->query($sql_s_category_id);
            if($result2->num_rows>0){
                $row = $result2->fetch_assoc();
                $a_category_id[] = $row['Category_ID'];
            }
        }


        $sql_s_customer = "SELECT Customer_ID FROM Customer WHERE Username = '$customer_username';";
        $result3 = $conn->query($sql_s_customer);
        $row = $result3->fetch_assoc();
        $customer_id = $row['Customer_ID'];


        // Generating Order ID
        $sql_s_orders = "SELECT COUNT(*) AS n_orders FROM Orders";
        $result = $conn->query($sql_s_orders);
        $row = $result->fetch_assoc();
        $next_order_id = $row['n_orders']+1;
        $order_id = "ODR".str_pad($next_order_id, 3, '0', STR_PAD_LEFT);
    

        // Inserting Into Orders Table
        $a_product_id = json_encode($a_product_id);
        $a_category_id = json_encode($a_category_id);
        $a_sku_id = json_encode($a_sku_id_);
        $a_quantity = json_encode($a_quantity_);
        $a_price = json_encode($a_product_price_);
        $sql_i_orders = "INSERT INTO Orders (Order_ID, Customer_ID, SKU_ID, Product_ID, Category_ID, Quantity, Price)
                            VALUES (?, ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql_i_orders);
        $stmt->bind_param("sssssss", $order_id, $customer_id, $a_sku_id, $a_product_id, $a_category_id, $a_quantity, $a_price);
        $stmt->execute();

        // Inserting Into Orders_Address Table
        $sql_i_order_address = "INSERT INTO Order_Address (Order_ID, Shipping_Country, Shipping_State, Shipping_City, Shipping_Village, Shipping_Street, Shipping_House_No, Shipping_Pin_Code, Billing_Country, Billing_State, Billing_City, Billing_Village, Billing_Street, Billing_House_No, Billing_Pin_Code)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt2 = $conn->prepare($sql_i_order_address);
        $stmt2->bind_param("sssssssssssssss", $order_id, $s_country, $s_state, $s_city, $s_village, $s_street, $s_house_no, $s_pin_code, $b_country, $b_state, $b_city, $b_village, $b_street, $b_house_no, $b_pin_code);
        $stmt2->execute();
        echo "1";

    }

    else{
        echo "0";
    }

?>