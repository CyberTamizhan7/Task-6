function KnockoutJS(){

    function Order(order_id, customer_id, customer_name, customer_username, a_sku_id, a_product_id, a_category_id, a_quantity, a_price, date, shipping_address, billing_address){
        this.order_id = ko.observable(order_id);
        this.customer_id = ko.observable(customer_id);
        this.customer_name = ko.observable(customer_name);
        this.customer_username = ko.observable(customer_username);
        this.a_sku_id = ko.observable(a_sku_id);
        this.a_product_id = ko.observable(a_product_id);
        this.a_category_id = ko.observable(a_category_id);
        this.a_quantity = ko.observable(a_quantity);
        this.a_price = ko.observable(a_price);
        this.date = ko.observable(date);
        this.shipping_address = ko.observable(shipping_address);
        this.billing_address = ko.observable(billing_address);
    }

    function Customer(c_id, name, age, address, username){
        this.customer_id = ko.observable(c_id);
        this.customer_name = ko.observable(name);
        this.customer_age = ko.observable(age);
        this.customer_address = ko.observable(address);
        this.customer_username = ko.observable(username);
    }

    function Product(sku_id, p_id, name, category, price){
        this.sku_id = ko.observable(sku_id);
        this.product_id = ko.observable(p_id);
        this.product_name = ko.observable(name);
        this.product_category = ko.observable(category);
        this.product_price = ko.observable(price);
    }

    function SubOrder(sku_id, name, category, quantity, price, subTotal){
        this.sku_id = ko.observable(sku_id);
        this.name = ko.observable(name);
        this.category = ko.observable(category);
        this.quantity = ko.observable(quantity);
        this.price = ko.observable(price);
        this.subTotal = ko.observable(subTotal);
    }

    function Admin(admin_id, username, created_at){
        this.admin_id = ko.observable(admin_id);
        this.username = ko.observable(username);
        this.created_at = ko.observable(created_at);
    }

    const self = this;
    this.customers = ko.observableArray([]);
    this.products = ko.observableArray([]);
    this.admins = ko.observableArray([]);
    this.orders = ko.observableArray([]);

    this.subOrder = ko.observableArray([]);

    this.total = ko.computed(function(){
        var sum=0;
        ko.utils.arrayForEach(self.subOrder(),function(item){
            sum += item.subTotal();
        })
        return sum;
    })

    // Fetching Customers
    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "fetch_initial_admin.php", true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.onload = function(){
        if(xhr2.status == 200){
            let data = JSON.parse(xhr2.responseText);
            console.log("Customers Data");
            console.log(data);
            for(let i=0;i<data.length;i++){
                self.customers.push(new Customer(
                    data[i]['Customer_ID'],
                    data[i]['Name'],
                    data[i]['Age'],
                    data[i]['Address'],
                    data[i]['Username']
                ));
            }
        }
    }
    xhr2.send("code="+encodeURIComponent('C'));

    // Fetching Products
    var xhr3 = new XMLHttpRequest();
    xhr3.open("POST", "fetch_initial_admin.php", true);
    xhr3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr3.onload = function(){
        if(xhr3.status == 200){
            let data = JSON.parse(xhr3.responseText);
            for(let i=0;i<data.length;i++){
                self.products.push(new Product(
                    data[i]['SKU_ID'],
                    data[i]['Product_ID'],
                    data[i]['Name'],
                    data[i]['Category'],
                    data[i]['Price']
                ));
            }
        }
    }
    xhr3.send("code="+encodeURIComponent('P'));

    // Fetching Orders
    var xhr7 = new XMLHttpRequest();
    xhr7.open("POST", "fetch_initial_admin.php", true);
    xhr7.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr7.onload = function(){
        if(xhr7.status == 200){
            let data = JSON.parse(xhr7.responseText);
            for(let i=0;i<data.length;i++){
                self.orders.push(new Order(
                    data[i]['Order_ID'],
                    data[i]['Customer_ID'],
                    data[i]['Name'],
                    data[i]['Username'],
                    data[i]['SKU_ID'],
                    data[i]['Product_ID'],
                    data[i]['Category_ID'],
                    data[i]['Quantity'],
                    data[i]['Price'],
                    data[i]['Created_At'],
                    data[i]['Shipping_Address'],
                    data[i]['Billing_Address']
                ));
            }
        }
    }
    xhr7.send("code="+encodeURIComponent('O'));

    // Fetching Admins
    var xhr9 = new XMLHttpRequest();
    xhr9.open("POST", "fetch_initial_admin.php", true);
    xhr9.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr9.onload = function(){
        if(xhr9.status == 200){
            let data = JSON.parse(xhr9.responseText);
            console.log("Admin Data");
            console.log(data);
            for(let i=0;i<data.length;i++){
                self.admins.push(new Admin(
                    data[i]['Admin_ID'],
                    data[i]['Username'],
                    data[i]['Created_At']
                ))
            }
        }
    }
    xhr9.send("code="+encodeURIComponent('A'));

    var a_username = localStorage.getItem('a_username');
    this.a_username = ko.observable(a_username);

    var xhr11 = new XMLHttpRequest();
    xhr11.open("POST", "fetch_session_username.php", true);
    xhr11.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr11.onload = function(){
        if(xhr11.status == 200){
            let response11 = xhr11.responseText;
            console.log("Admin Username : " + response11);
            self.a_username(response11);
        }
    }
    xhr11.send("code="+encodeURIComponent('A'));

    this.user_type = ko.observable("Admin");
    this.logout = function(){
        window.location.href = "logout.php";
    }
    var clickCounter = 0;
    this.show_profile = function(){
        clickCounter++;
        if(clickCounter%2==1){
            document.getElementById("ul_profile").style.display = "block";
        }
        else{
            document.getElementById("ul_profile").style.display = "none";
        }
    }

    this.n_orders = return_n_orders();
    this.n_customers = return_n_customers();
    this.n_admins = return_n_admins();
    this.n_products = return_n_products();

    this.view_dashboard = function(){
        document.getElementsByClassName("dashboard")[0].style.display = "grid";
        document.getElementsByClassName("customers")[0].style.display = "none";
        document.getElementsByClassName("products")[0].style.display = "none";
        document.getElementsByClassName("orders")[0].style.display = "none";
        document.getElementsByClassName("admins")[0].style.display = "none";
    }

    this.view_customers = function(){
        document.getElementsByClassName("dashboard")[0].style.display = "none";
        document.getElementsByClassName("customers")[0].style.display = "block";
        document.getElementsByClassName("products")[0].style.display = "none";
        document.getElementsByClassName("orders")[0].style.display = "none";
        document.getElementsByClassName("admins")[0].style.display = "none";
    }

    this.view_products = function(){
        document.getElementsByClassName("dashboard")[0].style.display = "none";
        document.getElementsByClassName("customers")[0].style.display = "none";
        document.getElementsByClassName("products")[0].style.display = "block";
        document.getElementsByClassName("orders")[0].style.display = "none";
        document.getElementsByClassName("admins")[0].style.display = "none";
    }

    this.view_orders = function(){
        document.getElementsByClassName("dashboard")[0].style.display = "none";
        document.getElementsByClassName("customers")[0].style.display = "none";
        document.getElementsByClassName("products")[0].style.display = "none";
        document.getElementsByClassName("orders")[0].style.display = "block";
        document.getElementsByClassName("admins")[0].style.display = "none";
    }

    this.view_admins = function(){
        document.getElementsByClassName("dashboard")[0].style.display = "none";
        document.getElementsByClassName("customers")[0].style.display = "none";
        document.getElementsByClassName("products")[0].style.display = "none";
        document.getElementsByClassName("orders")[0].style.display = "none";
        document.getElementsByClassName("admins")[0].style.display = "block";
    }

    this.edit_product = function(product){
        var sku_id = product.sku_id();
        var product_name = product.product_name();
        var product_price = product.product_price();
        var paramters = "sku_id="+encodeURIComponent(sku_id)+
                         "&name="+encodeURIComponent(product_name)+
                         "&price="+encodeURIComponent(product_price);
        var xhr5 = new XMLHttpRequest();
        xhr5.open("POST", "edit_product.php", true);
        xhr5.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr5.onload = function(){
            if(xhr5.status == 200){
                let response5 = xhr5.responseText;
                if(response5 == "1"){
                    alert("Edit Successfull!");
                }
                else if(response5 == "0"){
                    alert("No Edit Made");
                }
                else if(response5 == "-1"){
                    alert("Something went wrong.. check edit_product.php");
                }
                else if(response5 == "-2"){
                    alert("Updation SQL Error: Check edit_product.php");
                }
                else{
                    alert("Unknown Error: Check edit_product.php");
                }
            }
        }
        xhr5.send(paramters);
    }

    this.delete_product = function(product){
        self.products.remove(product);
        var sku_id = product.sku_id();
        var parameter = "sku_id="+encodeURIComponent(sku_id);
        var xhr6 = new XMLHttpRequest();
        xhr6.open("POST", "delete_product.php", true);
        xhr6.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr6.onload = function(){
            if(xhr6.status == 200){
                let response6 = xhr6.responseText;
                if(response6 == "1"){
                    alert("Deletion Successfull!");
                }
                else if(response6 == "-1"){
                    alert("Deletion SQL Error: Check delete_product.php");
                }
                else if(response6 == "0"){
                    alert("Something went wrong... Check delete_product.php");
                }
                else{
                    alert("UnknownError: Check delete_product.php");
                }
            }
        }
        xhr6.send(parameter);
    }

    this.add_product = function(){
        document.getElementsByClassName("container")[0].classList.add('blur');
        document.getElementsByClassName("add_product_pop_up")[0].style.display = "block";
    }

    this.ap_pop_up_cancel = function(){
        document.getElementsByClassName("container")[0].classList.remove('blur');
        document.getElementsByClassName("add_product_pop_up")[0].style.display = "none";
    }

    this.save_product = function(){
        var product_name = document.getElementById("i_product_name").value;
        var product_category = document.getElementById("drop_category").value;
        var product_price = document.getElementById("i_product_price").value;
        var parameters = "name="+encodeURIComponent(product_name)+
                         "&category="+encodeURIComponent(product_category)+
                         "&price="+encodeURIComponent(product_price);
        var xhr4 = new XMLHttpRequest();
        xhr4.open("POST", "save_product.php", true);
        xhr4.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr4.onload = function(){
            if(xhr4.status == 200){
                response4 = xhr4.responseText;
                if(response4 == "2"){
                    alert("Product " + product_name + " Exist Already, Please Refresh the Page and Check the Products Table Again!");
                }
                else if(response4 == "1"){
                    alert("Product Added Successfully!");
                }
                else if(response4 == "-1"){
                    alert("Insertion Error in save_product.php");
                }
                else if(response4 == "0"){
                    alert("Error: POST Request not send (check save_product.php)");
                }
                else if(response4 == "-2"){
                    alert("Please fill up all the input boxes");
                }
                else{
                    alert("Something went wrong: The following alert message displays the reponse from save_product.php");
                    alert(response4);
                }
            }
        }
        xhr4.send(parameters);
    }

    this.view_order = function(order){
        self.subOrder([]);
        document.getElementsByClassName("container")[0].classList.add("blur");
        document.getElementsByClassName("view_order")[0].style.display = "block";
        document.getElementById("pop_order_id").innerText = order.order_id();
        document.getElementById("pop_shipping_address").innerText = order.shipping_address();
        document.getElementById("pop_billing_address").innerText = order.billing_address();
        console.log("Order ID : " + order.order_id());
        console.log("Customer ID : " + order.customer_id());
        console.log("SKU ID : " + JSON.parse(order.a_sku_id()));
        console.log("Quantity : " + JSON.parse(order.a_quantity()));
        var xhr8 = new XMLHttpRequest();
        xhr8.open("POST", "fetch_sub_order.php", true);
        xhr8.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr8.onload = function(){
            if(xhr8.status == 200){
                let data = JSON.parse(xhr8.responseText);
                console.log(data);
                console.log(data[0]);
                console.log(data[0]['SKU_ID']);
                for(let i=0;i<data.length;i++){
                    self.subOrder.push(new SubOrder(
                        data[i]['SKU_ID'],
                        data[i]['Name'],
                        data[i]['Category'],
                        JSON.parse(order.a_quantity())[i],
                        data[i]['Price'],
                        parseInt(JSON.parse(order.a_quantity())[i]) * parseInt(data[i]['Price']),
                    ));
                }
            }
        }
        xhr8.send(JSON.stringify({ array1: JSON.parse(order.a_sku_id()), array2: JSON.parse(order.a_quantity())}));
    }

    this.back_view_order = function(){
        document.getElementsByClassName("container")[0].classList.remove("blur");
        document.getElementsByClassName("view_order")[0].style.display = "none";
    }
    
}

ko.applyBindings(new KnockoutJS());

function return_n_orders(){
    var xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "fetch_n_records.php", true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.onload = function(){
        if(xhr1.status == 200){
            let response1 = xhr1.responseText;
            console.log(response1);
            document.getElementById("n_orders").innerText = response1;
        }
    }
    xhr1.send("n="+encodeURIComponent(3));
}

function return_n_products(){
    var xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "fetch_n_records.php", true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.onload = function(){
        if(xhr1.status == 200){
            let response1 = xhr1.responseText;
            console.log(response1);
            document.getElementById("n_products").innerText = response1;
        }
    }
    xhr1.send("n="+encodeURIComponent(4));
}

function return_n_customers(){
    var xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "fetch_n_records.php", true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.onload = function(){
        if(xhr1.status == 200){
            let response1 = xhr1.responseText;
            console.log(response1);
            document.getElementById("n_customers").innerText = response1;
        }
    }
    xhr1.send("n="+encodeURIComponent(2));
}

function return_n_admins(){
    var xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "fetch_n_records.php", true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.onload = function(){
        if(xhr1.status == 200){
            let response1 = xhr1.responseText;
            console.log(response1);
            document.getElementById("n_admins").innerText = response1;
        }
    }
    xhr1.send("n="+encodeURIComponent(1));
}