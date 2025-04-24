function KnockoutJS(){

    function Cart(sku_id, product_name, category, price, quantity){
        const self = this;
        this.sku_id = ko.observable(sku_id);
        this.product_name = ko.observable(product_name);
        this.category_name = ko.observable(category);
        this.product_price = ko.observable(price);
        this.quantity = ko.observable(quantity);
        this.sub_total = ko.computed(function(){
            return (parseInt(self.product_price()) * parseInt(self.quantity()));
        });
    }

    const self=this;

    this.carts = ko.observableArray([]);

    this.total = ko.computed(function(){
        let total = 0;
        ko.utils.arrayForEach(self.carts(), function(item){
            total += item.sub_total();
        });
        return total;
    })

    this.decrease_product = function(product){
        if(product.quantity()<=0){
            alert("Invalid: Error -ve Quantities");
        }
        else{
            product.quantity(product.quantity()-1);
        }
    }

    this.increase_product = function(product){
        let max_stock = 10;
        if(product.quantity()>=max_stock){
            alert("Max Stock: " + max_stock.toString());
        }
        else{
            product.quantity(parseInt(product.quantity())+1);
        }
    }

    this.delete_product = function(product){
        self.carts.remove(product);
    }

    this.place_order = function(){

        var arr = ko.toJS(self.carts);
        var a_sku_id = arr.map(item=>item.sku_id);
        var a_product_name = arr.map(item=>item.product_name);
        var a_category_name = arr.map(item=>item.category_name);
        var a_product_price = arr.map(item=>parseInt(item.product_price));
        var a_quantity = arr.map(item=>parseInt(item.quantity));

        console.log(arr);
        console.log(a_sku_id);
        console.log(a_product_name);
        console.log(a_category_name);
        console.log(a_product_price);
        console.log(a_quantity);

        var s_name = document.getElementById("s_name").value;
        var s_age = document.getElementById("s_age").value;
        var s_gender = document.getElementById("s_gender").value;
        var s_phone = document.getElementById("s_phone").value;
        var s_email = document.getElementById("s_email").value;
        var s_country = document.getElementById("s_country").value;
        var s_state = document.getElementById("s_state").value;
        var s_city = document.getElementById("s_city").value;
        var s_village = document.getElementById("s_village").value;
        var s_street = document.getElementById("s_street").value;
        var s_house_no = document.getElementById("s_house_no").value;
        var s_pin_code = document.getElementById("s_pin_code").value;

        var b_name = document.getElementById("b_name").value;
        var b_age = document.getElementById("b_age").value;
        var b_gender = document.getElementById("b_gender").value;
        var b_phone = document.getElementById("b_phone").value;
        var b_email = document.getElementById("b_email").value;
        var b_country = document.getElementById("b_country").value;
        var b_state = document.getElementById("b_state").value;
        var b_city = document.getElementById("b_city").value;
        var b_village = document.getElementById("b_village").value;
        var b_street = document.getElementById("b_street").value;
        var b_house_no = document.getElementById("b_house_no").value;
        var b_pin_code = document.getElementById("b_pin_code").value;

        var parameters = "s_name=" + encodeURIComponent(s_name) +
                        "&s_age=" + encodeURIComponent(s_age) +
                        "&s_gender=" + encodeURIComponent(s_gender) +
                        "&s_phone=" + encodeURIComponent(s_phone) +
                        "&s_email=" + encodeURIComponent(s_email) +
                        "&s_country=" + encodeURIComponent(s_country) +
                        "&s_state=" + encodeURIComponent(s_state) +
                        "&s_city=" + encodeURIComponent(s_city) +
                        "&s_village=" + encodeURIComponent(s_village) +
                        "&s_street=" + encodeURIComponent(s_street) +
                        "&s_house_no=" + encodeURIComponent(s_house_no) +
                        "&s_pin_code=" + encodeURIComponent(s_pin_code) +

                        "&b_name=" + encodeURIComponent(b_name) +
                        "&b_age=" + encodeURIComponent(b_age) +
                        "&b_gender=" + encodeURIComponent(b_gender) +
                        "&b_phone=" + encodeURIComponent(b_phone) +
                        "&b_email=" + encodeURIComponent(b_email) +
                        "&b_country=" + encodeURIComponent(b_country) +
                        "&b_state=" + encodeURIComponent(b_state) +
                        "&b_city=" + encodeURIComponent(b_city) +
                        "&b_village=" + encodeURIComponent(b_village) +
                        "&b_street=" + encodeURIComponent(b_street) +
                        "&b_house_no=" + encodeURIComponent(b_house_no) +
                        "&b_pin_code=" + encodeURIComponent(b_pin_code) +

                        "&a_sku_id=" + encodeURIComponent(JSON.stringify(a_sku_id)) +
                        "&a_product_name=" + encodeURIComponent(JSON.stringify(a_product_name)) + 
                        "&a_category_name=" + encodeURIComponent(JSON.stringify(a_category_name)) +
                        "&a_product_price=" + encodeURIComponent(JSON.stringify(a_product_price)) + 
                        "&a_quantity=" + encodeURIComponent(JSON.stringify(a_quantity));

        if(window.XMLHttpRequest){
            var xhr3 = new XMLHttpRequest();
        }
        else{
            var xhr3 = new ActiveXObject("Microsoft.XMLHttp");
        }
        xhr3.open("POST", "checkout.php", true);
        xhr3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr3.onload = function(){
            if(xhr3.status == 200){
                var response = xhr3.responseText;
                alert("Response : ");
                alert(response);
            }
        }
        xhr3.send(parameters);


    }


    // Fetch Cart
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
                self.carts.push(new Cart(
                    response[i]['SKU_ID'],
                    response[i]['Product_Name'],
                    response[i]['Category_Name'],
                    response[i]['Price'],
                    response[i]['Quantity']
                ))
            }
        }
    }
    xhr2.send();

}

ko.applyBindings(new KnockoutJS());

