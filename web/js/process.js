function addToCart(idProduct) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "addToCart?productId=" + idProduct, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            swal("Good job!", "Added to cart!", "success");
            viewCart();
        }
    };
    xmlHttp.send();

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
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", "removeFromCart?productId=" + idProduct, true);
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    swal("Good job!", "Product removed from cart!", "success");
                    viewCart();
                }
            }
            xmlHttp.send();
        } else {
            swal("Product hasn't been remove!");
        }
    });
}

function viewCart() {
    //update view cart
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "viewCart", true)
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            // alert(xmlHttp.responseXML);
            // alert(new XMLSerializer().serializeToString(xmlHttp.responseXML.documentElement));
            showCart(xmlHttp.responseXML);
        }
    }
    xmlHttp.send();
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
    text += "<a href='javascript:removeFromCart(" +  Product.getElementsByTagName("id")[0].textContent.toString() + ");' id='removeProduct'><img src='images/close_edit.png'></a></h4>";
    text += "<span class='actual'>" + Product.getElementsByTagName("quantity")[0].textContent.toString() + " product x $" + Product.getElementsByTagName("price")[0].textContent.toString() + "</span>";
    desLi.innerHTML = text;
    document.getElementById("cart").appendChild(imgLi);
    document.getElementById("cart").appendChild(desLi);
}


function loadProduct() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "viewProduct", true)
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            // alert(xmlHttp.responseXML);
            // xmlDoc = new XMLSerializer().serializeToString(xmlHttp.responseXML.documentElement);
            showProduct(xmlHttp.responseXML);
        }
    }
    xmlHttp.send();
}

function showProduct(xmlDoc) {
    // alert(xmlDoc);
    var Products = xmlDoc.childNodes[0];
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
        aProduct.className = "col-md-3 shop_box"
        aProduct.appendChild(aTag);
        aProduct.appendChild(divTag);
        document.getElementById("shop").appendChild(aProduct);
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
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("POST", "clearCart", true);
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        if (xmlHttp.responseText.localeCompare("Success") == 0) {
                            swal("Your cart have been clear!", {
                                icon: "success",
                            });
                            viewCart();
                        } else {
                            swal("Nothing to clear cart!");
                        }
                    }
                }
                xmlHttp.send();
            } else {
                swal("Your cart hasn't been cleaned!");
            }
        });
}


function viewCheckout() {
    //update view cart
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "viewCart", true);
    
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var xmlHtppGetDB = new XMLHttpRequest();
            xmlHtppGetDB.open("POST","viewProduct", true);
            xmlHtppGetDB.onreadystatechange = function () {
                if (xmlHtppGetDB.readyState == 4 && xmlHtppGetDB.status == 200) { 
                    showCheckout(xmlHttp.responseXML, xmlHtppGetDB.responseXML);
                }
            }
            xmlHtppGetDB.send();
        }
    }
    xmlHttp.send();
}

function showCheckout(xmlDoc, xmlProduct){
    var Cart = xmlDoc.childNodes[0];
    var totalProduct = 0;
    var totalPrice = 0;
    if(Cart.children.length === 0){
        // document.getElementById("container").innerHTML = "";
        document.getElementById("checkout").innerHTML = " <h4 class='title'>Shopping cart is empty</h4><p class='cart'>You have no items in your shopping cart.<br>Click<a href='shop.jsp'> here</a> to continue shopping</p>";
    } else{
        document.getElementById("checkout").innerHTML = "";  
        var h4Tag = document.createElement("h4");
        h4Tag.className = "title";
        h4Tag.innerHTML = "CUSTOMER: " + document.getElementById("username").value;
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
    var Products = xmlProduct.childNodes[0];
    for (var i = 0; i < Cart.children.length; i++) {
        var Product = Cart.children[i];
        var ProductInDB = Products.children[i];
        totalProduct += parseInt(Product.getElementsByTagName("quantity")[0].textContent);
        totalPrice += parseInt(Product.getElementsByTagName("quantity")[0].textContent) * parseInt(Product.getElementsByTagName("price")[0].textContent);
        createProductInCart(Product, ProductInDB);
    }
    
    var divButton = document.createElement("div");
    divButton.className = "col-lg-offset-7";
    divButton.style.marginTop = "2%";
    divButton.innerHTML = "<h4 class='title' id='totalPriceOrder'>TOTAL: 0$</h4><div class='login_button text-center'><a href='#'>NEXT</a></div>";
    document.getElementById("checkout").appendChild(divButton);
    document.getElementById("totalPriceOrder").innerHTML = "TOTAL: " + totalPrice + "$";
    }
    // if (totalProduct > 0) {
    //     document.getElementById("totalProduct").innerHTML = "You have " + totalProduct + " product in Cart";
    // } else {
    //     document.getElementById("totalProduct").innerHTML = "Nothing in your cart";
    // }
}
function createProductInCart(Product, ProductInDB) {
    var productDiv = document.createElement("div");
    productDiv.className = "checkout_product row";

    var imgDiv = document.createElement("div");
    imgDiv.className = "col-lg-3";
    imgDiv.innerHTML = "<img src='images/" +  Product.getElementsByTagName("image")[0].textContent + "' class='product_img'/>";
    
    var desDiv = document.createElement("div");
    desDiv.className = "col-lg-4";
    desDiv.innerHTML = "<h3><a href='#'>" + Product.getElementsByTagName("name")[0].textContent + "</a></h3>" + "<p>" + Product.getElementsByTagName("description")[0].textContent+ "</p>";

    var priceDiv = document.createElement("div");
    priceDiv.className = "col-lg-2";
    priceDiv.innerHTML = "<span class='actual'>$" + Product.getElementsByTagName("price")[0].textContent + "</span><br>";

    

    var quantityDiv = document.createElement("div");
    quantityDiv.className = "col-lg-2 row";
    
    var subDiv = document.createElement("div");
    subDiv.className = "input-group-btn";
    

    var btnQuantity = document.createElement("a");
    btnQuantity.className = "btn btn-default";
    btnQuantity.href = "javascript:updateCartDown(" + Product.getElementsByTagName("id")[0].textContent +");";    
    btnQuantity.innerHTML = "-";
    subDiv.appendChild(btnQuantity);

    var inputQuantity = document.createElement("input");
    inputQuantity.type = "text";
    inputQuantity.min = 1;
    inputQuantity.max = ProductInDB.getElementsByTagName("quantity")[0].textContent;
    inputQuantity.style.width = "80px";
    inputQuantity.value = Product.getElementsByTagName("quantity")[0].textContent;
    inputQuantity.className = "btn btn-default";
    inputQuantity.autocomplete = "off";
    inputQuantity.disabled  = true;
    // inputQuantity = updateQuantity(inputQuantity.value);
    // inputQuantity
    subDiv.appendChild(inputQuantity);
    inputQuantity.id = "pro" + Product.getElementsByTagName("id")[0].textContent;

    var btnQuantityPlus = document.createElement("a");
    btnQuantityPlus.href = "javascript:updateCartUp(" + Product.getElementsByTagName("id")[0].textContent +");";
    btnQuantityPlus.className = "btn btn-default";
    btnQuantityPlus.innerHTML = "+";

    subDiv.appendChild(btnQuantityPlus);
    var actionDiv = document.createElement("div");
    actionDiv.className = "col-lg-1";
    actionDiv.innerHTML = "<a href='javascript:removeFromCartCheckout(" + Product.getElementsByTagName("id")[0].textContent + ");' class='btn btn-default' style='position: relative; '><img src='images/close_edit.png'></a>";

    quantityDiv.appendChild(subDiv);
    productDiv.appendChild(imgDiv);
    productDiv.appendChild(desDiv);
    productDiv.appendChild(priceDiv);
    productDiv.appendChild(quantityDiv);
    productDiv.appendChild(actionDiv);
    document.getElementById("checkout").appendChild(productDiv);
}

function removeFromCartCheckout(idProduct) {
    swal({
        title: "Are you sure?",
        text: "Remove product form cart!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }) 
    .then((willDelete) => {
        if (willDelete) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", "removeFromCart?productId=" + idProduct, true);
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    swal("Good job!", "Product removed from cart!", "success");
                    viewCheckout();
                    viewCart();
                }
            }
            xmlHttp.send();
        } else {
            swal("Product hasn't been remove!");
        }
    });
}
function updateCartUp(idProduct){
    var quantity = document.getElementById("pro" + idProduct).value;
    quantity = parseInt(quantity) + 1;
    var xmlHttp = new  XMLHttpRequest();
    xmlHttp.open("POST","updateCart?idProduct=" + idProduct + "&newQuantity=" + quantity, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            viewCheckout();
            swal("Good job!", "Cart updated!", "success");

        }
    }
    xmlHttp.send();
}
function updateCartDown(idProduct){
    var quantity = document.getElementById("pro" + idProduct).value;
    quantity = parseInt(quantity) - 1;
    var xmlHttp = new  XMLHttpRequest();
    xmlHttp.open("POST","updateCart?idProduct=" + idProduct + "&newQuantity=" + quantity, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            viewCheckout();
            swal("Good job!", "Cart updated!", "success");
        }
    }
    xmlHttp.send();
}
