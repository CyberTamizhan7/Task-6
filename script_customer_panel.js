
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
            console.log("Produce Quantity : ", product.quantity());
            exists.quantity(parseInt(exists.quantity())+parseInt(product.quantity()));
        }
    };

    this.c_username = ko.observable(username);
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
        window.location.href = "index.html";
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