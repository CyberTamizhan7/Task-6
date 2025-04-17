function c_sign_in(){
    document.getElementsByClassName("form2-container")[0].style.display = "none";
    document.getElementsByClassName("form1-container")[0].style.display = "block";
}

function c_sign_up(){
    document.getElementsByClassName("form1-container")[0].style.display = "none";
    document.getElementsByClassName("form2-container")[0].style.display = "block";
}

function customer_login(){
    let c_username = document.getElementById("cl_username").value;
    let c_password = document.getElementById("cl_password").value;
    let parameters = "c_username="+encodeURIComponent(c_username)+"&c_password="+encodeURIComponent(c_password);
    var xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "customer_login_auth.php", true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.onload = function(){
        if(xhr1.status == 200){
            let response = xhr1.responseText;
            if(response=='1'){
                let c_username = document.getElementById("cl_username").value;
                localStorage.setItem('c_username', c_username);
                window.location.href = "customer_panel.html";
            }
            else if(response=='0'){
                alert("Invalid Username");
            }
            else if(response=='2'){
                alert("Invalid Password");
            }
            else{
                alert("Unknown Error: Check customer_login_auth.php");
            }
        }
    }
    xhr1.send(parameters);
}

function customer_register(){
    let c_username = document.getElementById("cr_username").value;
    let c_password = document.getElementById("cr_password").value;
    let parameters = "c_username="+encodeURIComponent(c_username)+"&c_password="+encodeURIComponent(c_password);
    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "customer_registration.php", true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.onload = function(){
        if(xhr2.status == 200){
            let response = xhr2.responseText;
            if(response=='1'){
                alert("Customer Registration Successfull!");
            }
            else if(response=='0'){
                alert("Username Already Exist!");
            }
            else{
                alert("Unknown Error: Check customer_registration.php");
            }
        }
    }
    xhr2.send(parameters);

}

function admin_login(){
    alert("Admin Login in process");
}




