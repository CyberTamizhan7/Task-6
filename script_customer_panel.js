
function KnockoutJS(){

    function Product(sku_id, name, category, price, quantity){
        const self = this;
        this.sku_id = ko.observable(sku_id);
        this.product_name = ko.observable(name);
        this.product_category = ko.observable(category);
        this.product_price = ko.observable(price);
        this.quantity = ko.observable(quantity);
        this.sub_total = ko.computed(function(){
            return (parseInt(self.product_price()) * parseInt(self.quantity()));
        })
    }

    const self = this;
    var username = localStorage.getItem('c_username');
    let clickCounter = 0;

    this.products = ko.observableArray([]);
    this.cart = ko.observableArray([]);

    this.total = ko.computed(function(){
        let totalAmount = 0;
        ko.utils.arrayForEach(self.cart(), function(item) {
            totalAmount += item.sub_total();
        });
        return totalAmount;
    });

    this.add_to_cart = function(product){
        let exists = self.cart().find(p=>p.sku_id() === product.sku_id());
        console.log("Exists : ", exists);
        if(!exists){
            self.cart.push(new Product(product.sku_id(), product.product_name(), product.product_category(), product.product_price(), product.quantity()));
        }
        else{
            console.log("Product Quantity : ", product.quantity());
            exists.quantity(parseInt(exists.quantity())+parseInt(product.quantity()));
        }
    };

    this.c_username = ko.observable(username);

    var xhr10 = new XMLHttpRequest();
    xhr10.open("POST", "fetch_session_username.php", true);
    xhr10.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr10.onload = function(){
        if(xhr10.status == 200){
            let response10 = xhr10.responseText;
            console.log("Customer Username : " + response10);
            self.c_username(response10);
        }
    }
    xhr10.send("code="+encodeURIComponent('C'));

    
    this.view_profile = function(){
        clickCounter++;
        if(clickCounter%2==1){
            document.getElementById("l_profile_view").style.display="block";
        }
        else{
            document.getElementById("l_profile_view").style.display="none";
        }
    }
    this.logout = function(){
        window.location.href = "logout.php";
    }

    this.view_checkout = function(){
        document.getElementsByClassName("pop-up")[0].style.display = "block";
        document.getElementsByClassName("container")[0].classList.add("blur");
    }

    this.cancel_checkout = function(){
        document.getElementsByClassName("pop-up")[0].style.display = "none";
        document.getElementsByClassName("container")[0].classList.remove("blur");
    }

    this.checkout = function(){
        var username = localStorage.getItem('c_username');
        var name = document.getElementById("i_name").value;
        var age = document.getElementById("i_age").value;
        var shipping_address = document.getElementById("ta_shipping_address").value;
        var billing_address = document.getElementById("ta_billing_address").value;

        if(username==""){
            alert("Username not found, check localstorage");
        }

        else if(name=="" || age=="" || shipping_address=="" || billing_address==""){
            alert("Fill Up all the boxes");
        }

        else{
            var a_sku_id = [];
            var a_product_name = [];
            var a_product_category = [];
            var a_quantity = [];
            var a_product_price = [];
            self.cart().forEach(item=>{
                console.log("SKU_ID: ", item.sku_id());
                a_sku_id.push(item.sku_id());
                a_product_name.push(item.product_name());
                a_product_category.push(item.product_category());
                a_quantity.push(item.quantity());
                a_product_price.push(item.product_price());
            })

            console.log("SKU ID: ", a_sku_id);
            console.log("Product Name: ", a_product_name);
            console.log("Category Name: ", a_product_category);
            console.log("Product Price: ", a_product_price);
            console.log("Quantity: ", a_quantity);

            parameters = "name="+encodeURIComponent(name)+
                        "&username="+encodeURIComponent(username)+
                        "&age="+encodeURIComponent(age)+
                        "&shipping_address="+encodeURIComponent(shipping_address)+
                        "&billing_address="+encodeURIComponent(billing_address)+
                        "&a_sku_id="+encodeURIComponent(JSON.stringify(a_sku_id))+
                        "&a_product_name="+encodeURIComponent(JSON.stringify(a_product_name))+
                        "&a_product_category="+encodeURIComponent(JSON.stringify(a_product_category))+
                        "&a_product_price="+encodeURIComponent(JSON.stringify(a_product_price))+
                        "&a_quantity="+encodeURIComponent(JSON.stringify(a_quantity));
                        

            var xhr2 = new XMLHttpRequest();
            xhr2.open("POST", "checkout.php", true);
            xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr2.onload = function(){
                if(xhr2.status == 200){
                    var checkout_response = xhr2.responseText;
                    if(checkout_response=="1"){
                        alert("Check Out Successfull!");
                        self.cancel_checkout();
                    }
                    else if(checkout_response=="0"){
                        alert("Something went wrong");
                    }
                    else{
                        alert(checkout_response);
                    }
                }
            }
            xhr2.send(parameters);
        }
    }

    // Fetching Initial Data
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "fetch_initial.php", true);
    xhr1.onload = function(){
        if(xhr1.status==200){
            var response = JSON.parse(xhr1.responseText);
            console.log(response);
            for(let i=0;i<response.length;i++){
                console.log(response[i][0]);
                self.products.push(new Product(response[i]['SKU_ID'], response[i]['Name'], response[i]['Category'], response[i]['Price'], 0));
            }
        }
        else{
            console.log("XHR1 Status : " + xhr1.status);
        }
    }
    xhr1.send();

}

ko.applyBindings(new KnockoutJS());



// Delete LocalStorage Datas
window.addEventListener("beforeunload", function () {
    localStorage.clear()
  });