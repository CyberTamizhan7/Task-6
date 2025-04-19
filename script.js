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
    let c_name = document.getElementById("cr_name").value;
    let c_age = document.getElementById("cr_age").value;
    let c_address = document.getElementById("cr_address").value;
    let parameters = "c_username="+encodeURIComponent(c_username)+
                     "&c_password="+encodeURIComponent(c_password)+
                     "&c_name="+encodeURIComponent(c_name)+
                     "&c_age="+encodeURIComponent(c_age)+
                     "&c_address="+encodeURIComponent(c_address);
    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "customer_registration.php", true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.onload = function(){
        if(xhr2.status == 200){
            let response = xhr2.responseText;
            if(response=='1'){
                alert("Customer Registration Successfull!");
                document.getElementsByClassName("form1-container")[0].style.display = "block";
                document.getElementsByClassName("form2-container")[0].style.display = "none";
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
    var a_username = document.getElementById("al_username").value;
    var a_password = document.getElementById("al_password").value;
    var a_parameters = "username="+encodeURIComponent(a_username)+
                       "&password="+encodeURIComponent(a_password);
    var xhr3 = new XMLHttpRequest();
    xhr3.open("POST", "admin_login_auth.php", true);
    xhr3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr3.onload = function(){
        if(xhr3.status == 200){
            var a_response = xhr3.responseText;
            if(a_response=="1"){
                localStorage.setItem('a_username', a_username);
                window.location.href = "admin_panel.html";
            }
            else if(a_response=="2"){
                alert("Invalid Password!");
            }
            else if(a_response=="0"){
                alert("Invalid Username!");
            }
            else{
                alert("Unknown Error: Check admin_login_auth.php");
            }
        }
    }
    xhr3.send(a_parameters);
}




