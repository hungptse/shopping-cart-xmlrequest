<!--A Design by W3layouts
Author: W3layout
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE HTML>
<html>

<head>
    <title>Products</title>
    <!-- <link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
     -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous">

    <link href="css/style.css" rel='stylesheet' type='text/css' />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
</head>

<body onload="loadProductInDB();">
    <%@include file="header.jsp" %>
    <div class="main">
        <div class="shop_top">
            <div class="container">
                <div class="row">
                    <!-- <div class="col-md-7">
				  <div class="map">
					<iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.in/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Lighthouse+Point,+FL,+United+States&amp;aq=4&amp;oq=light&amp;sll=26.275636,-80.087265&amp;sspn=0.04941,0.104628&amp;ie=UTF8&amp;hq=&amp;hnear=Lighthouse+Point,+Broward,+Florida,+United+States&amp;t=m&amp;z=14&amp;ll=26.275636,-80.087265&amp;output=embed"></iframe><br><small><a href="https://maps.google.co.in/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=Lighthouse+Point,+FL,+United+States&amp;aq=4&amp;oq=light&amp;sll=26.275636,-80.087265&amp;sspn=0.04941,0.104628&amp;ie=UTF8&amp;hq=&amp;hnear=Lighthouse+Point,+Broward,+Florida,+United+States&amp;t=m&amp;z=14&amp;ll=26.275636,-80.087265" style="color:#666;text-align:left;font-size:12px"></a></small>
				  </div>
				</div>
				<div class="col-md-5">
					<p class="m_8">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat</p>
					<div class="address">
				                <p>500 Lorem Ipsum Dolor Sit,</p>
						   		<p>22-56-2-9 Sit Amet, Lorem,</p>
						   		<p>USA</p>
				   		<p>Phone:(00) 222 666 444</p>
				   		<p>Fax: (000) 000 00 00 0</p>
				 	 	<p>Email: <span>support[at]snow.com</span></p>
				   		<p>Follow on: <span>Facebook</span>, <span>Twitter</span></p>
				   </div>
                </div> -->
                    <table class="table table-hover " id="table">
                        
                        <thead class="thead-dark text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody id="dataProduct" class="text-center">
                            <!-- <tr>
                                <th scope="row">1</th>
                                <td>Iphone X</td>
                                <td>10</td>
                                <td>10</td>
                                <td class="row">
                                    <a href="#"><img src="images/edit.png" alt=""></a>
                                    <div style="width: 2%"></div>
                                    <a href="#"><img src="images/close_edit.png" alt=""></a>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                    <div class="check_button text-center" style="float: left;" id="btnAdd"><a href="javascript:addProduct();">ADD NEW</a></div>
                    <div id="infoProduct">
                        <div class="register-top-grid">
                            <h2>PRODUCT INFORMATION</h2>
                            <div>
                                <span>PRODUCT ID</span>
                                <input type="text" readonly="true" id="idProduct">
                            </div>
                            <div>
                                <span>PRODUCT NAME</span>
                                <input type="text" id="name">
                            </div>
                            <div>
                                <span>PRODUCT DESCRIPTION</span>
                                <textarea id="description" cols="60" rows="5"></textarea>
                            </div>
                            <div>
                                <span>PRICE</span>
                                <input type="text" id="price">
                            </div>
                            <div>
                                <span>QUANTITY</span>
                                <input type="text" id="quantity">
                            </div>
                            <div class="clear"> </div>
                        </div>
                        <div class="clear"> </div>
                        <!-- <input type="button" class="login_button" value="submit"> -->
                        <div>
                            <div class="check_button text-center" id="divUpdate" style="float: none"><a href="javascript:updateProduct();">Update Product</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="javascript:cancelUpdate();">Cancel</a></div>
                            <div class="check_button text-center" id="divAdd" style="float: none; display:none;"><a href="javascript:postProduct();">Add Product</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="javascript:cancelUpdate();">Cancel</a></div>
                        </div>

                    </div>
                </div>

            
            </div>
        </div>
    </div>
</body>
<script src="js/process.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</html>