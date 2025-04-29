<?php

    session_start();

    include('connection.php');
    if(isset($_SESSION['c_username'])){
        $customer_username = $_SESSION['c_username'];
        $sql_s_c_username = "SELECT Customer_ID FROM Customer WHERE Username = '{$customer_username}';";
        $result = $conn->query($sql_s_c_username);
        $row = $result->fetch_assoc();
        $customer_id = $row['Customer_ID']; //C002
        $sql_s_carts = "SELECT SKU_ID, Product_ID, Category_ID, Price, SUM(Quantity) AS Total_Quantity 
                        FROM Carts
                        WHERE Customer_ID = '{$customer_id}'
                        GROUP BY Product_ID;";
        $carts = [];
        $result2 = $conn->query($sql_s_carts);
        if($result2->num_rows>0){
            while($row = $result2->fetch_assoc()){
                $carts[] = $row;
            }
        }
        
        $counter = 0;
        foreach($carts as $cart){
            $product_id = $cart['Product_ID'];
            $category_id = $cart['Category_ID'];
            $sql_s_product_name = "SELECT Name FROM Products WHERE Product_ID = '{$product_id}';";
            $sql_s_category_name = "SELECT Category FROM Product_Categories WHERE Category_ID = '{$category_id}';";
            $result1 = $conn->query($sql_s_product_name);
            $result2 = $conn->query($sql_s_category_name);
            $row1 = $result1->fetch_assoc();
            $row2 = $result2->fetch_assoc();
            $product_name = $row1['Name'];
            $category_name = $row2['Category'];
            $carts[$counter]['Product_Name'] = $product_name;
            $carts[$counter]['Category_Name'] = $category_name;
            $counter++;
        }

        header("Content-Type: application/json");
        echo json_encode($carts);
    }
    else{
        echo "Error: Session Customer Name Not Found!";
    }

?>