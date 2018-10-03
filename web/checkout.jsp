<!--A Design by W3layouts
Author: W3layout
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE HTML>
<html>

<head>
    <title>Checkout</title>
    <link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
    <link href="css/style.css" rel='stylesheet' type='text/css' />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
    <script type="application/x-javascript">
        addEventListener("load", function () {
            setTimeout(hideURLbar, 0);
        }, false);

        function hideURLbar() {
            window.scrollTo(0, 1);
        }
    </script>
    <script src="js/jquery.min.js"></script>
</head>
<!-- viewCheckout(); -->

<body onload="viewCart();viewCheckout();">
    <%@include file="header.jsp" %>
    <div class="main">
        <div class="shop_top">
            <div class="container" id="checkout">
                    <!-- <h4 class="title">CUSTOMER: ${cart.username} </h4> -->
                    <!-- <h4 class="title">CUSTOMER: ${cart.username} </h4>
                    <div class="checkout_product row">
                        <div class="col-lg-3" style="padding-left: 3%">
                            <h4 class="title">Image</h4>
                        </div>
                        <div class="col-lg-4">
                                <h4 class="title">Name</h4>
                        </div>
                        <div class="col-lg-2">
                                <h4 class="title">Price</h4>
                        </div>
                        <div class="col-lg-2 row">
                                <h4 class="title">Quantity</h4>
                        </div>
                        <div class="col-lg-1">
                                <h4 class="title">Action</h4>
                        </div>
                    </div> -->
                    <!-- <div id="checkout"> -->
                        <!-- <div class="checkout_product row">
                            <div class="col-lg-3">
                                <img src="images/pic10.jpg" class="product_img" />
                            </div>
                            <div class="col-lg-4">
                                <h3><a href="#">aliquam volutp</a></h3>
                                <p>Lorem ipsum consectetuer adipiscing </p>
                            </div>
                            <div class="col-lg-2">
                                <span class="actual">$12.00</span><br>
                            </div>
                            <div class="col-lg-2 row">
                                <div class="input-group-btn">
                                    <button class="btn btn-default" type="button">-</button>
                                    <input class="btn btn-default" type="text" style="width: 50px;" value="5" min="1" onkeyup="checkValidate()"></input>
                                    <button class="btn btn-default" type="button">+</button>
                                </div>
                            </div>
                            <div class="col-lg-1">
                            <a href="#" class="btn btn-default" style="position: relative; "><img src="images/close_edit.png"></a>
                            </div>
                        </div> -->
                    <!-- </div> -->
                    <!-- <div class="col-lg-offset-7" style="margin-top: 2%">
                        <h4 class="title" id="totalPriceOrder">TOTAL: 0$</h4>
                        <div class="login_button text-center"><a href="#">NEXT</a></div>
                    </div> -->
            </div>
        </div>
    </div>
</body>
<script src="js/process.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</html>