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

<body onload="loadProduct();viewCart();">
<!--    <div class="header">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-left">
                        <div class="logo">
                            <a href="index.html"><img src="images/logo.png" alt="" /></a>
                        </div>
                        <div class="menu">
                            <a class="toggleMenu" href="#"><img src="images/nav.png" alt="" /></a>
                            <ul class="nav" id="nav">
                                <li class="current"><a href="shop.jsp">Shop</a></li>
                                <li><a href="team.html">Team</a></li>
                                <li><a href="experiance.html">Events</a></li>
                                <li><a href="experiance.html">Experiance</a></li>
                                <li><a href="shop.html">Company</a></li>
                                <li><a href="contact.html">Contact</a></li>
                                <div class="clear"></div>
                            </ul>
                             <script type="text/javascript" src="js/responsive-nav.js"></script> 
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="header_right">
                         start search
                        <div class="search-box">
                            <div id="sb-search" class="sb-search">
                                <form>
                                    <input class="sb-search-input" placeholder="Enter your search term..." type="search"
                                        name="search" id="search">
                                    <input class="sb-search-submit" type="submit" value="">
                                    <span class="sb-icon-search"> </span>
                                </form>
                            </div>
                        </div>
                        --search-scripts--
                        <script src="js/classie.js"></script>
                        <script src="js/uisearch.js"></script>
                        <script>
                            new UISearch(document.getElementById('sb-search'));
                        </script>
                        <ul class="icon1 sub-icon1 profile_img">
                            <li><a class="active-icon c1" href="#"></a>
                                <ul class="sub-icon1 list">
                                    <c:if test="${empty sessionScope.USERNAME}">
                                        <div class="login_buttons">
                                        <div class="login_button text-center"><a href="login.jsp">Login</a></div>
                                    </div>
                                    </c:if>
                                    <c:if test="${not empty sessionScope.USERNAME}">
                                        <div class="login_buttons">
                                            <div class="login_button text-center"><a href="#">Welcome, ${sessionScope.USERNAME}</a></div>
                                    </div>
                                    </c:if>
                                    <hr>
                                    <div class="clear"></div>
                                    <h5 href="#" id="totalProduct" class="text-center">Nothing in your cart</h5>
                                    <div id="cart">
                                         List Product 
                                    </div>
                                    <li id="totalPrice">TOTAL: 0$</li>
                                    <div class="login_buttons">
                                        <div class="check_button"><a href="checkout.html">Check out</a></div>
                                        <div class="clear_button"><a href="javascript:clearCart();">Clear cart</a></div>
                                    </div>
                                    <div class="clear"></div>
                                </ul>
                            </li>
                        </ul>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>-->

    <%@include file="header.jsp" %>
    <div class="main">
        <div class="shop_top">
            <div class="container">
                <div class="row shop_box-top" id="shop">
                    <h1 style="margin-bottom: 2%">Shopping Cart - HungPT</h1>         
                </div>
                <div class="login_button text-center col-lg-4 col-lg-offset-4"><a href="#">Load more</a></div>
            </div>
            
        </div>
    </div>
</body>
<script src="js/process.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</html>