
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

    this.decrease_quantity = function(product){
        if(product.quantity()==0){
            alert("Invalid: -ve Quantities");
        }
        else{
            product.quantity(product.quantity()-1);
        }
    }

    this.increase_quantity = function(product){
        let max_product = 10;
        if(product.quantity()==max_product){
            alert("Invalid: Max Product Stock Count Reached (" + max_product.toString() + ")");
        }
        else{
            product.quantity(parseInt(product.quantity())+1);
        }
    }

    this.add_to_cart = function(product){
        if(product.quantity() == 0){
            alert("Error: Cannot Add 0 Stock to Cart!");
        }
        else{
            let exists = self.cart().find(p=>p.sku_id() === product.sku_id());
            console.log("Exists : ", exists);
            if(!exists){
                var parameters = "customer_username="+encodeURIComponent(self.c_username())+
                                "&sku_id="+encodeURIComponent(product.sku_id())+
                                "&product_name="+encodeURIComponent(product.product_name())+
                                "&category="+encodeURIComponent(product.product_category())+
                                "&price="+encodeURIComponent(product.product_price())+
                                "&quantity="+encodeURIComponent(product.quantity());
                var xhr12 = new XMLHttpRequest();
                xhr12.open("POST", "save_cart.php", true);
                xhr12.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr12.onload = function(){
                    if(xhr12.status == 200){
                        var response12 = xhr12.responseText;
                        console.log("Cart DB Insertion Status: " + response12);
                    }
                }
                xhr12.send(parameters);
                self.cart.push(new Product(product.sku_id(), product.product_name(), product.product_category(), product.product_price(), product.quantity()));
            }
            else{
                console.log("Product Quantity : ", product.quantity());
                exists.quantity(parseInt(exists.quantity())+parseInt(product.quantity()));
            }
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

    this.delete_cart_product = function(product){
        var xhr13 = new XMLHttpRequest();
        xhr13.open("POST", "delete_cart.php", true);
        xhr13.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr13.onload = function(){
            if(xhr13.status == 200){
                var response13 = xhr13.responseText;
                console.log("Response (Delete Product) : " + response13);
            }
        }
        xhr13.send("sku_id="+encodeURIComponent(product.sku_id()));
        self.cart.remove(product);
    }

    this.view_checkout = function(){
        if(self.cart().length === 0){
            alert("Cart Empty, Nothing to Checkout!");
        }
        else{
            window.location.href = "checkout.html";
        }  
    }


    // Fetching Initial Data
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "fetch_initial_customer.php", true);
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

    if(window.XMLHttpRequest){
        var xhr2 = new XMLHttpRequest();
    }
    else{
        var xhr2 = new ActiveXObject("Microsoft.XMLHttp");
    }
    xhr2.open("POST", "fetch_initial_customer_cart.php", true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.onload = function(){
        if(xhr2.status==200){
            var response = JSON.parse(xhr2.responseText);
            for(let i=0;i<response.length;i++){
                self.cart.push(new Product(
                    response[i]['SKU_ID'],
                    response[i]['Product_Name'],
                    response[i]['Category_Name'],
                    response[i]['Price'],
                    response[i]['Total_Quantity']
                ))
            }
        }
    }
    xhr2.send();

}

ko.applyBindings(new KnockoutJS());


