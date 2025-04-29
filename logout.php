<?php

    session_start();
    session_unset();
    session_destroy();
    setcookie("c_username","",time()-3600,"/");
    setcookie("a_username","",time()-3600,"/");
    header("Location: customer_login_real.html");
    exit();

?>
