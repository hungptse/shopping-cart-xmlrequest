<%-- 
    Document   : header
    Created on : Sep 16, 2018, 1:42:54 AM
    Author     : THANH HUNG
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<div class="header">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="header-left">
                    <div class="logo">
                        <a href="index.jsp"><img src="images/logo.png" alt="" /></a>
                    </div>
                    <div class="menu">
                        <a class="toggleMenu" href="#"><img src="images/nav.png" alt="" /></a>
                        <ul class="nav" id="nav">
                            <li class="current"><a href="shop.jsp">Shop</a></li>
                            <li><a href="products.jsp">Product</a></li>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Experiance</a></li>
                            <li><a href="#">Company</a></li>
                            <%-- <li><a href="#">Contact</a></li> --%>
                            <div class="clear"></div>
                        </ul>
                        <!-- <script type="text/javascript" src="js/responsive-nav.js"></script> -->
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="header_right">
                    <!-- start search-->
                    <div class="search-box">
                        <div id="sb-search" class="sb-search">
                            <form>
                                <input class="sb-search-input" placeholder="Enter your search term..." type="search"
                                  id="search" onkeyup="sendSearchRequest(this.value)" autocomplete="off">
                                <input class="sb-search-submit" type="button" value="">
                                <span class="sb-icon-search"> </span>
                            </form>
                        </div>
                    </div>
                    <!----search-scripts---->
                    <script src="js/classie.js"></script>
                    <script src="js/uisearch.js"></script>
                    <script>
                        new UISearch(document.getElementById('sb-search'));
                    </script>
                    <ul class="icon1 sub-icon1 profile_img">
                        <li><a class="active-icon c1" href="#"></a>
                            <ul class="sub-icon1 list">
                                <c:set var="username" value="${sessionScope.USERNAME}"></c:set>
                                <div class="login_buttons">
                                <c:if test="${empty username}">
                                        <div class="login_button text-center"><a href="login.jsp">Login</a></div>
                                    </c:if>
                                <c:if test="${not empty username}">
                                        <div class="login_button text-center"><a href="#">Welcome,
                                                ${sessionScope.USERNAME}</a></div>
                                    </c:if>
                                </div>
                                <hr>
                                <div class="clear"></div>
                                <h5 href="#" id="totalProduct" class="text-center">Nothing in your cart</h5>
                                <div id="cart">
                                    <!-- List Product -->
                                </div>
                                <li id="totalPrice">TOTAL: 0$</li>
                                <div class="login_buttons">
                                    <div class="check_button"><a href="checkout.jsp">Check out</a></div>
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
</div>

</html>