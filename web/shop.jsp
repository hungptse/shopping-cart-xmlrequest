<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>

<head>
    <title>Shopping Cart</title>
    <link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
    <link href="css/style.css" rel='stylesheet' type='text/css' />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
</head>

<body onload="loadProduct();viewCart();initTotal();">
    <%@include file="header.jsp" %>
    <div class="main">
        <div class="shop_top">
            <div class="container">
                <h4 class="title" style="margin-bottom: 2%">> Shop HungPT</h4>         
                <div class="row shop_box-top" id="shop">
                </div>
                <div class="login_button text-center col-lg-4 col-lg-offset-4" id="loadMore"><a>Scroll down to load more</a></div>
                <div class="login_button text-center col-lg-4 col-lg-offset-4" id="back" style="display: none;"><a href="javascript:loadProduct();">Back to Shop</a></div>
            </div>
            
        </div>
    </div>
</body>
<script src="js/process.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</html>