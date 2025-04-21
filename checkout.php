<?php

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $c_username = $_POST['username'];
        $c_name = $_POST['name'];
        $c_age = $_POST['age'];
        $c_shipping_address = $_POST['shipping_address'];
        $c_billing_address = $_POST['billing_address'];
        $a_sku_id = $_POST['a_sku_id'];
        $a_product_name = $_POST['a_product_name'];
        $a_product_category = $_POST['a_product_category'];
        $a_product_price = $_POST['a_product_price'];
        $a_quantity = $_POST['a_quantity'];
        $a_sku_id_ = json_decode($a_sku_id, true);
        $a_product_name_ = json_decode($a_product_name, true);
        $a_product_category_ = json_decode($a_product_category, true);
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
            $category_name = $a_product_category_[$i];
            $category_name = mysqli_real_escape_string($conn, $category_name);
            $sql_s_category_id = "SELECT Category_ID FROM Product_Categories WHERE Category = '$category_name'";
            $result2 = $conn->query($sql_s_category_id);
            if($result2->num_rows>0){
                $row = $result2->fetch_assoc();
                $a_category_id[] = $row['Category_ID'];
            }
        }


        $sql_s_customer = "SELECT Customer_ID FROM Customer WHERE Username = '$c_username';";
        $result3 = $conn->query($sql_s_customer);
        $row = $result3->fetch_assoc();
        $customer_id = $row['Customer_ID'];


        // Generating Order ID
        $sql_s_orders = "SELECT COUNT(*) AS n_orders FROM Orders";
        $result = $conn->query($sql_s_orders);
        $row = $result->fetch_assoc();
        $next_order_id = $row['n_orders']+1;
        $order_id = "ODR".str_pad($next_order_id, 3, '0', STR_PAD_LEFT);
    

        // Inserting into Orders Table
        $a_product_id = json_encode($a_product_id);
        $a_category_id = json_encode($a_category_id);
        $a_sku_id = json_encode($a_sku_id_);
        $a_quantity = json_encode($a_quantity_);
        $a_price = json_encode($a_product_price_);
        $sql_i_orders = "INSERT INTO Orders (Order_ID, Customer_ID, SKU_ID, Product_ID, Category_ID, Quantity, Price, Shipping_Address, Billing_Address)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql_i_orders);
        $stmt->bind_param("sssssssss", $order_id, $customer_id, $a_sku_id, $a_product_id, $a_category_id, $a_quantity, $a_price, $c_shipping_address, $c_billing_address);
        $stmt->execute();
        echo "1";
        
    }

    else{
        echo "0";
    }

?>