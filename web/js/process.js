function addToCart(idProduct) {


    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("POST", "addToCart?productId=" + idProduct, true);
    // xmlHttp.onreadystatechange = function () {
    //     if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
    //         swal("Good job!", "Added to cart!", "success");
    //         viewCart();
    //     }
    // };
    // xmlHttp.send();
    var Product;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "product?id=" + idProduct, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            var xmlDoc = xmlHttp.responseXML;
            Product = xmlDoc.childNodes[0];
            var textProduct = window.localStorage.getItem(idProduct);
            if (textProduct != null) {
                Product = StringToXML(textProduct);
                var tmp = parseInt(Product.getElementsByTagName("quantity")[0].textContent) + 1;
                Product.getElementsByTagName("quantity")[0].textContent = tmp;
                window.localStorage.setItem(idProduct, XMLToString(Product));
            } else {
                Product.getElementsByTagName("quantity")[0].textContent = 1;
                window.localStorage.setItem(idProduct, XMLToString(Product));
            }
            var count = window.localStorage.getItem("count");
            count = parseInt(count) + 1;
            window.localStorage.setItem("count", count);
            viewCart();
            swal("Good job!", "Added to cart!", "success");
        }
    };
    xmlHttp.send();
}

function XMLToString(oXML) {
    //code for IE
    if (window.ActiveXObject) {
        var oString = oXML.xml;
        return oString;
    }
    // code for Chrome, Safari, Firefox, Opera, etc.
    else {
        return (new XMLSerializer()).serializeToString(oXML);
    }
}

function StringToXML(oString) {
    //code for IE
    if (window.ActiveXObject) {
        var oXML = new ActiveXObject("Microsoft.XMLDOM");
        oXML.loadXML(oString);
        return oXML;
    }
    // code for Chrome, Safari, Firefox, Opera, etc. 
    else {
        return (new DOMParser()).parseFromString(oString, "text/xml");
    }
}

function removeFromCart(idProduct) {
    swal({
            title: "Are you sure?",
            text: "Remove product form cart!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                window.localStorage.removeItem(idProduct);
                swal("Good job!", "Product removed from cart!", "success");
                var count = window.localStorage.getItem("count");
                count = parseInt(count) - 1;
                window.localStorage.setItem("count", count);
                viewCart();
                viewCheckout();
            } else {
                swal({
                    title: "Product hasn't been remove!",
                    icon: "error"
                });
            }
        });
}

function viewCart() {
    //update view cart
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("POST", "viewCart", true)
    // xmlHttp.onreadystatechange = function () {
    //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    //         // alert(xmlHttp.responseXML);
    //         // alert(new XMLSerializer().serializeToString(xmlHttp.responseXML.documentElement));
    //         showCart(xmlHttp.responseXML);
    //     }
    // }
    // xmlHttp.send();
    var cartXML = "<Cart>";
    for (var index = 0; index < window.localStorage.length; index++) {
        var key = window.localStorage.key(index);
        var value = window.localStorage.getItem(key);
        if (key != null && key.indexOf("count") === -1) {
            cartXML += value;
        }
    }
    cartXML += "</Cart>";
    showCart(StringToXML(cartXML));
}


function showCart(xmlDoc) {
    var Cart = xmlDoc.childNodes[0];
    var totalProduct = 0;
    var totalPrice = 0;
    var clearDiv = document.createElement("div");
    clearDiv.className = "clear";
    document.getElementById("cart").innerHTML = "";
    for (var i = 0; i < Cart.children.length; i++) {
        var Product = Cart.children[i];
        totalProduct += parseInt(Product.getElementsByTagName("quantity")[0].textContent);
        totalPrice += parseInt(Product.getElementsByTagName("quantity")[0].textContent) * parseInt(Product.getElementsByTagName("price")[0].textContent);
        createProductView(Product);
        document.getElementById("cart").appendChild(clearDiv);
    }
    if (totalProduct > 0) {
        document.getElementById("totalProduct").innerHTML = "You have " + totalProduct + " product in Cart";
    } else {
        document.getElementById("totalProduct").innerHTML = "Nothing in your cart";
    }
    document.getElementById("totalPrice").innerHTML = "TOTAL: " + totalPrice + "$";
}

function createProductView(Product) {
    var imgProduct = document.createElement("img");
    imgProduct.src = "images/" + Product.getElementsByTagName("image")[0].textContent.toString();
    imgProduct.style.height = "50px";
    imgProduct.style.width = "50px";
    var imgLi = document.createElement("li");
    imgLi.className = "list_img";
    imgLi.appendChild(imgProduct);
    var desLi = document.createElement("li");
    desLi.className = "list_desc";
    desLi.style.marginBottom = "20px";
    var text = "<h4><a href='#'>" + Product.getElementsByTagName("name")[0].textContent.toString() + "</a>";
    text += "<a href='javascript:removeFromCart(" + Product.getElementsByTagName("id")[0].textContent.toString() + ");' id='removeProduct'><img src='images/close_edit.png'></a></h4>";
    text += "<h5 class='actual'>" + Product.getElementsByTagName("quantity")[0].textContent.toString() + " product x $" + Product.getElementsByTagName("price")[0].textContent.toString() + "</h5>";
    desLi.innerHTML = text;
    document.getElementById("cart").appendChild(imgLi);
    document.getElementById("cart").appendChild(desLi);
}
var to = 4;
// var from = 0;

function loadProduct() {
    // this.from = this.from + 4;
    // this.to = this.to + 4;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "product?from=0" + "&to=" + this.to, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            // alert(xmlHttp.responseXML);
            // xmlDoc = new XMLSerializer().serializeToString(xmlHttp.responseXML.documentElement);
            showProduct(xmlHttp.responseXML);
            // productXML = xmlHttp.responseXML;
            // alert(xmlHttp.responseText);
        }
    };
    xmlHttp.send();
    if (window.localStorage.getItem("count") == null) {
        window.localStorage.setItem("count", 0);
    }
    document.getElementById("search").value = "";
}


function initTotal() {
    if (window.localStorage.getItem("total") == null) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "product?count=count", true);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                window.localStorage.setItem("total", xmlHttp.responseText);
            }
        };
        xmlHttp.send();
    }
    this.from = 0;
    this.to = 4;
}

function showProduct(xmlDoc) {
    // alert(xmlDoc);
    document.getElementById("shop").innerHTML = "";
    if (xmlDoc != null) {
        var Products = xmlDoc.childNodes[0];
        if (Products.children.length == 0) {
            document.getElementById("shop").innerHTML = "<h4 class='title text-center'>Can't find any record in DB";
            document.getElementById("back").style.display = "";
            document.getElementById("loadMore").style.display = "none";
        } else {
            document.getElementById("back").style.display = "none";
            document.getElementById("loadMore").style.display = "";
            for (var i = 0; i < Products.children.length; i++) {
                var Product = Products.children[i];
                var aTag = document.createElement("a");
                aTag.href = "#";
                var imgTag = document.createElement("img");
                imgTag.src = "images/" + Product.getElementsByTagName("image")[0].textContent.toString();
                imgTag.className = "img-responsive";
                imgTag.style.marginBottom = "5%";
                var divTag = document.createElement("div");
                divTag.className = "shop_desc";
                var h3Tag = document.createElement("h3");
                var nameTag = document.createElement("a");
                nameTag.href = "#";
                nameTag.innerHTML = Product.getElementsByTagName("name")[0].textContent.toString();
                h3Tag.appendChild(nameTag);
                var pTag = document.createElement("p");
                pTag.innerHTML = Product.getElementsByTagName("description")[0].textContent.toString();
                var spanTag = document.createElement("span");
                spanTag.className = "actual";
                spanTag.innerHTML = "$" + Product.getElementsByTagName("price")[0].textContent.toString();
                var ulTag = document.createElement("ul");
                ulTag.className = "buttons";
                var btnAddToCart = document.createElement("li");
                btnAddToCart.className = "cart";
                var aAddToCart = document.createElement("a");
                aAddToCart.href = "javascript:addToCart(" + Product.getElementsByTagName("id")[0].textContent.toString() + ");";
                aAddToCart.innerHTML = "Add To Cart";
                btnAddToCart.appendChild(aAddToCart);

                var btnReadMore = document.createElement("li");
                btnReadMore.className = "shop_btn";
                var aReadMore = document.createElement("a");
                aReadMore.href = "#";
                aReadMore.innerHTML = "Read More";
                btnReadMore.appendChild(aReadMore);
                var clearDiv = document.createElement("div");
                clearDiv.className = "clear";
                ulTag.appendChild(btnAddToCart);
                ulTag.appendChild(btnReadMore);
                ulTag.appendChild(clearDiv);
                divTag.appendChild(h3Tag);
                divTag.appendChild(pTag);
                divTag.appendChild(spanTag);
                divTag.appendChild(ulTag);
                aTag.appendChild(imgTag);

                var aProduct = document.createElement("div");
                aProduct.className = "col-md-3 shop_box";
                aProduct.appendChild(aTag);
                aProduct.appendChild(divTag);
                aProduct.style.marginTop = "3%";
                document.getElementById("shop").appendChild(aProduct);
            }
        }
    }
}

function clearCart() {
    swal({
            title: "Are you sure?",
            text: "Once clear, you will not be able to recover this cart!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                var count = window.localStorage.getItem("count");
                if (count !== 0) {
                    swal("Your cart have been clear!", {
                        icon: "success",
                    });
                    window.localStorage.clear();
                    viewCart();
                    viewCheckout();
                } else {
                    swal("Nothing to clear cart!");
                }
            } else {
                swal({
                    title: "Your cart hasn't been cleaned!",
                    icon: "error"
                });
            }
        });
}



function viewCheckout() {

    var count = localStorage.getItem("count");
    var totalPrice = 0;
    if (count === null || count === '0') {
        document.getElementById("checkout").innerHTML = " <h4 class='title'>Shopping cart is empty</h4><p class='cart'>You have no items in your shopping cart.<br>Click<a href='shop.jsp'> here</a> to continue shopping</p>";
    } else {
        document.getElementById("checkout").innerHTML = "";
        var h4Tag = document.createElement("h4");
        h4Tag.className = "title";
        h4Tag.innerHTML = "CUSTOMER";
        // h4Tag.innerHTML = "CUSTOMER: " + document.getElementById("username").value;
        var divTitle = document.createElement("div");
        divTitle.className = "checkout_product row";
        var imgTitle = document.createElement("div");
        imgTitle.className = "col-lg-3";
        imgTitle.style.paddingLeft = "3%";
        imgTitle.innerHTML = "<h4 class='title'>Image</h4>";
        var nameTitle = document.createElement("div");
        nameTitle.className = "col-lg-4";
        nameTitle.innerHTML = "<h4 class='title'>Name</h4>";

        var priceTitle = document.createElement("div");
        priceTitle.className = "col-lg-2";
        priceTitle.innerHTML = "<h4 class='title'>Price</h4>";

        var quantityTitle = document.createElement("div");
        quantityTitle.className = "col-lg-2 row";
        quantityTitle.innerHTML = "<h4 class='title'>Quantity</h4>";

        var actionTitle = document.createElement("div");
        actionTitle.className = "col-lg-1";
        actionTitle.innerHTML = "<h4 class='title'>Action</h4>";

        divTitle.appendChild(imgTitle);
        divTitle.appendChild(nameTitle);
        divTitle.appendChild(priceTitle);
        divTitle.appendChild(quantityTitle);
        divTitle.appendChild(actionTitle);

        document.getElementById("checkout").appendChild(h4Tag);
        document.getElementById("checkout").appendChild(divTitle);
        // var Products = xmlProduct.childNodes[0];

        for (var index = 0; index < window.localStorage.length; index++) {
            var key = window.localStorage.key(index);
            var value = window.localStorage.getItem(key);
            if (key != null && key.indexOf("count") === -1) {
                var Product = StringToXML(value);
                totalPrice += parseInt(Product.getElementsByTagName("quantity")[0].textContent) * parseInt(Product.getElementsByTagName("price")[0].textContent);
                createProductInCart(Product);
            }
        }
        var divButton = document.createElement("div");
        divButton.className = "col-lg-offset-7";
        divButton.style.marginTop = "2%";
        divButton.innerHTML = "<h4 class='title' id='totalPriceOrder'>TOTAL: 0$</h4><div class='login_button text-center'><a href='#'>NEXT</a></div>";
        document.getElementById("checkout").appendChild(divButton);
        document.getElementById("totalPriceOrder").innerHTML = "TOTAL: " + totalPrice + "$";
    }
}



function createProductInCart(Product) {
    var productDiv = document.createElement("div");
    productDiv.className = "checkout_product row";

    var imgDiv = document.createElement("div");
    imgDiv.className = "col-lg-3";
    imgDiv.innerHTML = "<img src='images/" + Product.getElementsByTagName("image")[0].textContent + "' class='product_img'/>";

    var desDiv = document.createElement("div");
    desDiv.className = "col-lg-4";
    desDiv.innerHTML = "<h3><a href='#'>" + Product.getElementsByTagName("name")[0].textContent + "</a></h3>" + "<p>" + Product.getElementsByTagName("description")[0].textContent + "</p>";

    var priceDiv = document.createElement("div");
    priceDiv.className = "col-lg-2";
    priceDiv.innerHTML = "<span class='actual'>$" + Product.getElementsByTagName("price")[0].textContent + "</span><br>";

    var quantityDiv = document.createElement("div");
    quantityDiv.className = "col-lg-2 row";

    var subDiv = document.createElement("div");
    subDiv.className = "input-group-btn";


    var btnQuantity = document.createElement("a");
    btnQuantity.className = "btn btn-default";
    btnQuantity.href = "javascript:updateCartDown(" + Product.getElementsByTagName("id")[0].textContent + ");";
    btnQuantity.innerHTML = "-";
    subDiv.appendChild(btnQuantity);

    var inputQuantity = document.createElement("input");
    inputQuantity.type = "text";
    inputQuantity.style.width = "80px";
    inputQuantity.value = Product.getElementsByTagName("quantity")[0].textContent;
    inputQuantity.className = "btn btn-default";
    inputQuantity.autocomplete = "off";
    inputQuantity.disabled = true;
    // inputQuantity = updateQuantity(inputQuantity.value);
    subDiv.appendChild(inputQuantity);
    inputQuantity.id = Product.getElementsByTagName("id")[0].textContent;

    var btnQuantityPlus = document.createElement("a");
    btnQuantityPlus.href = "javascript:updateCartUp(" + Product.getElementsByTagName("id")[0].textContent + ");";
    btnQuantityPlus.className = "btn btn-default";
    btnQuantityPlus.innerHTML = "+";

    subDiv.appendChild(btnQuantityPlus);
    var actionDiv = document.createElement("div");
    actionDiv.className = "col-lg-1";
    actionDiv.innerHTML = "<a href='javascript:removeFromCart(" + Product.getElementsByTagName("id")[0].textContent + ");' class='btn btn-default' style='position: relative; '><img src='images/close_edit.png'></a>";

    quantityDiv.appendChild(subDiv);
    productDiv.appendChild(imgDiv);
    productDiv.appendChild(desDiv);
    productDiv.appendChild(priceDiv);
    productDiv.appendChild(quantityDiv);
    productDiv.appendChild(actionDiv);
    document.getElementById("checkout").appendChild(productDiv);
}


function updateCartUp(idProduct) {
    var textProduct = window.localStorage.getItem(idProduct);
    var Product = StringToXML(textProduct);
    var tmp = parseInt(Product.getElementsByTagName("quantity")[0].textContent) + 1;
    Product.getElementsByTagName("quantity")[0].textContent = tmp;
    window.localStorage.setItem(idProduct, XMLToString(Product));
    viewCart();
    viewCheckout();
    // if (parseInt(Product.getElementsByTagName("quantity")[0].textContent) <= 5) {

    // } else{
    //     swal({
    //         title: "Quantity can't more than " + 5 + " in stock",
    //         icon: "error"
    //     });
    // }


}

function updateCartDown(idProduct) {
    var textProduct = window.localStorage.getItem(idProduct);
    var Product = StringToXML(textProduct);
    if (parseInt(Product.getElementsByTagName("quantity")[0].textContent) > 1) {
        var tmp = parseInt(Product.getElementsByTagName("quantity")[0].textContent) - 1;
        Product.getElementsByTagName("quantity")[0].textContent = tmp;
        window.localStorage.setItem(idProduct, XMLToString(Product));
        viewCart();
        viewCheckout();
    } else {
        swal({
            title: "Quantity can't less than 1",
            icon: "error"
        });
    }
}
//////////////////////////////////////////////////////////////////////////////////////////// 
//PRODUCT CRUD
function validateLogin() {
    var txtUsername = document.getElementById("username");
    var txtPassword = document.getElementById("password");
    if (txtUsername.value === "") {
        swal("Login Failed!", "Username can't be blank!", "error");
        return false;
    }
    if (txtPassword.value === "") {
        swal("Login Failed!", "Password can't be blank!", "error");
        return false;
    }
    return true;
}

function loadProductInDB() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "product", true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            // alert(xmlHttp.responseXML);
            // xmlDoc = new XMLSerializer().serializeToString(xmlHttp.responseXML.documentElement);
            showProductInDB(xmlHttp.responseXML);
            // productXML = xmlHttp.responseXML;
            // alert(xmlHttp.responseText);
        }
    };
    xmlHttp.send();
}


var lastId = 0;

function showProductInDB(xmlDoc) {
    document.getElementById("dataProduct").innerHTML = "";
    var Products = xmlDoc.childNodes[0];
    for (var i = 0; i < Products.children.length; i++) {
        lastId = i + 1;
        var Product = Products.children[i];
        var row = document.createElement("tr");
        var no = document.createElement("th");
        no.scope = "row";
        no.innerHTML = i + 1;
        var name = document.createElement("td");
        name.innerHTML = Product.getElementsByTagName("name")[0].textContent.toString();
        var price = document.createElement("td");
        price.innerHTML = Product.getElementsByTagName("price")[0].textContent.toString();
        var quantity = document.createElement("td");
        quantity.innerHTML = Product.getElementsByTagName("quantity")[0].textContent.toString();
        row.appendChild(no);
        row.appendChild(name);
        row.appendChild(price);
        row.appendChild(quantity);
        var edit = document.createElement("a");
        edit.innerHTML = "<img src='images/edit.png'>";
        edit.href = "javascript:showPopup(" + Product.getElementsByTagName("id")[0].textContent.toString() + ");";
        var deleteProduct = document.createElement("a");
        deleteProduct.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<img src='images/close_edit.png'>";
        deleteProduct.href = "javascript:deleteProduct(" + Product.getElementsByTagName("id")[0].textContent.toString() + ");";
        var action = document.createElement("td");
        action.appendChild(edit);
        action.appendChild(deleteProduct);
        row.appendChild(action);
        document.getElementById("dataProduct").appendChild(row);
    }
    document.getElementById("table").style.display = "";
    document.getElementById("infoProduct").style.display = "none";

}

function showPopup(idProduct) {
    document.getElementById("table").style.display = "none";
    document.getElementById("infoProduct").style.display = "block";
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("divAdd").style.display = "none";
    document.getElementById("divUpdate").style.display = "";

    var id = document.getElementById("idProduct");
    var name = document.getElementById("name");
    var description = document.getElementById("description");
    var price = document.getElementById("price");
    var quantity = document.getElementById("quantity");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "product?id=" + idProduct, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            var xmlDoc = xmlHttp.responseXML;
            var Product = xmlDoc.childNodes[0];
            id.value = Product.getElementsByTagName("id")[0].textContent.toString();
            name.value = Product.getElementsByTagName("name")[0].textContent.toString();
            description.value = Product.getElementsByTagName("description")[0].textContent.toString();
            price.value = Product.getElementsByTagName("price")[0].textContent.toString();
            quantity.value = Product.getElementsByTagName("quantity")[0].textContent.toString();
        }
    }
    xmlHttp.send();
}

function cancelUpdate() {
    //    location.reload();
    document.getElementById("table").style.display = "";
    document.getElementById("infoProduct").style.display = "none";
    document.getElementById("btnAdd").style.display = "";
}

function updateProduct() {
    var id = document.getElementById("idProduct");
    var name = document.getElementById("name");
    var description = document.getElementById("description");
    var price = document.getElementById("price");
    var quantity = document.getElementById("quantity");
    var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("PUT","http://localhost:8080/RestAPI/seminar/product/" + id.value, true);
    xmlHttp.open("PUT", "product", true);

    xmlHttp.setRequestHeader('Content-type', 'application/xml');
    // xmlHttp.setRequestHeader
    xmlDoc = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?>";
    xmlDoc += "<Product>";
    xmlDoc += "<id>" + id.value + "</id>";
    xmlDoc += "<name>" + name.value + "</name>";
    xmlDoc += "<description>" + description.value + "</description>";
    xmlDoc += "<price>" + price.value + "</price>";
    xmlDoc += "<quantity>" + quantity.value + "</quantity>";
    xmlDoc += "</Product>";
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            loadProductInDB();
            document.getElementById("btnAdd").style.display = "";
        } else {
            console.log(xmlHttp);
        }
    }
    xmlHttp.send(xmlDoc);
}

function addProduct() {
    document.getElementById("table").style.display = "none";
    document.getElementById("infoProduct").style.display = "block";
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("divUpdate").style.display = "none";
    document.getElementById("divAdd").style.display = "";
    var id = document.getElementById("idProduct");
    var name = document.getElementById("name");
    var description = document.getElementById("description");
    var price = document.getElementById("price");
    var quantity = document.getElementById("quantity");
    id.value = lastId + 1;
    name.value = "";
    description.value = "";
    price.value = "";
    quantity.value = "";
}

function postProduct() {
    var id = document.getElementById("idProduct");
    var name = document.getElementById("name");
    var description = document.getElementById("description");
    var price = document.getElementById("price");
    var quantity = document.getElementById("quantity");
    var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("PUT","http://localhost:8080/RestAPI/seminar/product/" + id.value, true);
    xmlHttp.open("POST", "product", true);
    xmlHttp.setRequestHeader('Content-type', 'application/xml');
    xmlDoc = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?>";
    xmlDoc += "<Product>";
    xmlDoc += "<id>" + id.value + "</id>";
    xmlDoc += "<name>" + name.value + "</name>";
    xmlDoc += "<description>" + description.value + "</description>";
    xmlDoc += "<price>" + price.value + "</price>";
    xmlDoc += "<quantity>" + quantity.value + "</quantity>";
    xmlDoc += "</Product>";
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            loadProductInDB();
            document.getElementById("btnAdd").style.display = "";
        } else {
            console.log(xmlHttp);
        }
    }
    xmlHttp.send(xmlDoc);
}

function deleteProduct(id) {
    swal({
            title: "Are you sure?",
            text: "Delete this Product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("DELETE", "product?id=" + id, true);
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        swal("Product have been deleted!", {
                            icon: "success",
                        });
                        loadProductInDB();
                    }
                }
                xmlHttp.send();
            } else {
                swal("Product haven't been deleted!!");
            }
        });
}

function sendSearchRequest(search) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "product?search=" + search, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            if (xmlHttp.responseXML != null) {
                showProduct(xmlHttp.responseXML);
            }
        }
    };
    xmlHttp.send();
}

window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.to = this.to + 4;
        // this.from = this.from + 4;

        var total = parseInt(window.localStorage.getItem("total"));
        console.log("total " + total + " to " + to);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "product?from=0" + "&to=" + this.to, true);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                // alert(xmlHttp.responseXML);
                // xmlDoc = new XMLSerializer().serializeToString(xmlHttp.responseXML.documentElement);
                showProduct(xmlHttp.responseXML);
                // productXML = xmlHttp.responseXML;
                // alert(xmlHttp.responseText);
            }
        };
        xmlHttp.send();
    }
};