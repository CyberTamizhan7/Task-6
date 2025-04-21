<?php

    include('connection.php');

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $inputData = json_decode(file_get_contents("php://input"), true);
        if(isset($inputData['array1']) && isset($inputData['array2'])){
            $array1 = $inputData['array1'];
            $array2 = $inputData['array2'];
            $sub_order = [];
            for($i=0;$i<count($array1);$i++){
                $current_sku_id = $array1[$i];
                $sql_s_product_details = "SELECT a.SKU_ID, a.Name, b.Category, a.Price
                                          FROM Products a
                                          JOIN Product_Categories b
                                          ON a.Category_ID = b.Category_ID
                                          WHERE a.SKU_ID = '$current_sku_id';";
                $result = $conn->query($sql_s_product_details);
                $row = $result->fetch_assoc();
                $sub_order[] = $row;
            }

            echo json_encode($sub_order);
        }
        else{
            echo "-1";
        }
    }

    else{
        echo "0";
    }

?>