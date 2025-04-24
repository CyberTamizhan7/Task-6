<?php

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $c_username = $_POST['customer_username'];
        $sku_id = $_POST['sku_id'];
        $product_name = $_POST['product_name'];
        $category = $_POST['category'];
        $price = $_POST['price'];
        $quantity = $_POST['quantity'];

        // Fetching Customer ID
        $sql_s_c_id = "SELECT Customer_ID FROM Customer WHERE Username = '$c_username';";
        $result = $conn->query($sql_s_c_id);
        $row = $result->fetch_assoc();
        $c_id = $row['Customer_ID'];

        // Fetching Product ID
        $sql_s_p_id = "SELECT Product_ID FROM Products WHERE Name = '$product_name';";
        $result = $conn->query($sql_s_p_id);
        $row = $result->fetch_assoc();
        $p_id = $row['Product_ID'];

        // Fetching Category ID
        $sql_s_category_id = "SELECT Category_ID FROM Product_Categories WHERE Category='$category';";
        $result = $conn->query($sql_s_category_id);
        $row = $result->fetch_assoc();
        $category_id = $row['Category_ID'];
        
        // Generating Cart ID
        $sql_s_carts = "SELECT Cart_ID
                        FROM Carts 
                        ORDER BY Cart_ID DESC
                        LIMIT 1;";
        $result = $conn->query($sql_s_carts);
        if($result->num_rows==0){
            $next_cart_id = "CRT001";
        }
        else{
            $row = $result->fetch_assoc();
            $next_cart_id = $row['Cart_ID'];
            $next_cart_id = preg_replace('/\D/', '', $next_cart_id);
            $next_cart_id = (int)$next_cart_id+1;
            $next_cart_id = "CRT".str_pad($next_cart_id, 3, '0', STR_PAD_LEFT);
        }
        $sql_i_cart = "INSERT INTO Carts (Cart_ID, Customer_ID, SKU_ID, Product_ID, Category_ID, Quantity, Price)
                        VALUES ('$next_cart_id', '$c_id', '$sku_id', '$p_id', '$category_id', $quantity, $price);";
        if($conn->query($sql_i_cart) === FALSE){
            echo "-1";
        }
        else{
            echo "1";
        }
    }

    else{
        echo "0";
    }

?>