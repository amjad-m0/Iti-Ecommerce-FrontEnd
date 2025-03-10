var favouriteItems=[];
var cartItems=[];
 var subcategories=[];
var categories=[];
var products=[];
var users=[];
var myA=document.querySelectorAll(".nav-a");
subcategories=JSON.parse(localStorage.getItem("subcategories"));
categories=JSON.parse(localStorage.getItem("categories"));
products=JSON.parse(localStorage.getItem("products"));
users=JSON.parse(localStorage.getItem("users"));
//  localStorage.removeItem("loginData")
 //localStorage.setItem("loginData",JSON.stringify({userId:1,loginFlag:true}));

for (let i = 0; i < myA.length; i++) {
  myA[i].addEventListener('click',function(e){
    e.target.classList.add("active")
    // console.log(e.target);
  })  
}

 var loginData = JSON.parse(localStorage.getItem("loginData"));
var myUser = null;
var loginFlag = false;
if (loginData) {
  myUser = users.find(user => user.userId === loginData.userId);
  var totalProducts=0;
  for(let i=0;i<myUser?.shoppingCart?.length;i++){
    totalProducts+=Number(myUser.shoppingCart[i].quantityInCart);
  }
  document.getElementById("badge").classList.toggle("d-none")
  document.getElementById("badge").innerText=totalProducts;
  loginFlag = loginData.loginFlag;
  if (myUser && !myUser.shoppingCart) {
      myUser.shoppingCart = [];
  }
  if (myUser && !myUser.favourite) {
      myUser.favourite = [];
  }
}

var home=`
<section >
<div id="carouselExampleIndicators" class="carousel slide"  data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>      
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="../images/2.jpeg" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../images/output (1).jpg" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../images/output (2).jpg" alt="Third slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
</section>
  <section id="description" class=" container p-5">
<div class="container">
    <div class="row gy-5">
    <div class="col-md-8  col-lg-5 descr-image-container overflow-hidden rounded-2 p-0 ">
        <img src="../images/last try.jpg" alt="" class="img-description w-100 rounded-2">
    </div>
    <div class=" col-lg-7 d-flex justify-content-center  flex-column ">
             <h1 class="myColor">Cozy Crumbs</h1>
             <p class="desc">Welcome to Cozy Crumbs Bakery, where every bite brings joy! Discover a delightful assortment of freshly baked breads, indulgent cakes, and irresistible pastries crafted with love. Pair your treats with our selection of refreshing drinks, from specialty coffees to fruity juices. Whether you're celebrating a special occasion or indulging in a daily treat, we've got the perfect flavors for you!</p>
    </div>
    </div>
</div>
</section>
<section class="macy-section container text-center">
    <h2 class="mb-5 myColor">Sub Categories</h2>
    <div class="macy-container"  >
        <div  id="macy-container"  >
    </div>
        </div>
      </div>
 </section>
 <section id="bestSeller" class="container text-center mt-3 py-5 px-3">
 <h2 class="myColor">Best Seller</h2>
 <div class="owl-carousel owl-theme p-3 bg-white" id="myOwlCarousel">
 
 </div> 
 </section>
`;
var search=`
<div class="container p-5 mt-5 ">
<div class="w-75 m-auto">
  <input type="text"  placeholder="Search By Name" id="mySearchInput">
</div>
<div class="row  mt-4 g-4" id="searchContainer"> 
  
</div>
</div>`

var cart=` <div class="container cartcontainer">
<header class="text-center my-5">
    <h1 class="display-4">Your Cart</h1>
    <p class="lead myColor">Accepting Credit Card Payments | Reserve and Order For Delivery Or Pick Up</p>
</header>

<div class="cart">
    <!-- Cart Header -->
    <div class="cart-header row font-weight-bold">
        <div class="col-12 col-md-3">PRODUCT</div>
        <div class="col-6 col-md-2">PRICE</div>
        <div class="col-6 col-md-2">QUANTITY</div>
        <div class="col-6 col-md-2">TOTAL</div>
        <div class="col-6 col-md-3">ACTION</div>
    </div>

    <!-- Cart Items -->
    <ul class="cart-items list-unstyled" id="cartItems">
        <!-- Cart items will be dynamically added here -->
    </ul>

    <!-- Cart Summary -->
    <div class="cart-summary text-end my-4">
        <p>Subtotal: <span class="subtotal" id="subtotal">EGP 0.00</span></p>
        <p>Tax included. Delivery fees calculated at checkout.</p>
        <a href="#" onclick="navigate(event, '/checkout')" class="btn  checkout-btn">Proceed to Checkout</a>
    </div>
</div>
</div>`

var favourite=`
<div class="container cartcontainer">
<header class="text-center my-5">
    <h1 class="display-4 myColor">Your Favourite</h1>
</header>

<div class="cart">
    <!-- Cart Header -->
    <div class="cart-header row font-weight-bold">
        <div class="col-12 col-md-3">PRODUCT</div>
        <div class="col-6 col-md-2">PRICE</div>
        <div class="col-6 col-md-2">Add To Cart</div> 
        <div class="col-6 col-md-3">ACTION</div>
    </div>
    <ul class="cart-items list-unstyled" id="favouriteItems">
        <!-- Cart items will be dynamically added here -->
    </ul>
</div>
</div>`;
var checkOut=`
<div class="container mt-5 cartcontainer">
        <header class="text-center my-5">
            <h1 class="display-4">Checkout</h1>
            <p class="lead myColor">Accepting Credit Card Payments | Reserve and Order For Delivery Or Pick Up</p>
        </header>
        <div class="row">
            <!-- Order Summary -->
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title myColor">Order Summary</h2>
                        <ul class="cart-items list-unstyled" id="orderSummary">
                            <!-- Cart items will be dynamically added here -->
                        </ul>
                        <p>Subtotal: <span class="checkOutSubtotal"id="checkOutSubtotal">EGP 0.0</span></p>
                        <p>Tax included. Delivery fees calculated at checkout.</p>
                    </div>
                </div>
            </div>

            <!-- Shipping and Payment Form -->
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title myColor">Shipping & Payment Details</h2>
                        <div class="checkout-form" >
                            <!-- Shipping Details -->
                            <div class="form-group">
                                <label for="name">Full Name</label>
                                <input type="text" id="name" class="form-control" name="name" required>
                                <span class="error-message" id="name-error"></span>
                            </div>

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" class="form-control" name="email" required>
                                <span class="error-message" id="email-error"></span>
                            </div>

                            <div class="form-group">
                                <label for="address">Shipping Address</label>
                                <textarea id="address" class="form-control" name="address" required></textarea>
                                <span class="error-message" id="address-error"></span>
                            </div>

                            <!-- Payment Details -->
                            <div class="form-group">
                                <label for="card">Credit Card Number</label>
                                <input type="text" id="card" class="form-control" name="card" required>
                                <span class="error-message" id="card-error"></span>
                            </div>

                            <div class="form-group">
                                <label for="expiry">Expiry Date</label>
                                <input type="text" id="expiry" class="form-control" placeholder="MM/YY" name="expiry" required>
                                <span class="error-message" id="expiry-error"></span>
                            </div>

                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" class="form-control" name="cvv" required>
                                <span class="error-message" id="cvv-error"></span>
                            </div>

                            <!-- Place Order Button -->
                            <span  class="btn btn-success btn-block checkout-btn" onclick="handleCheckout()">Place Order</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

   var notFound=`
   <div class="container vh-100  d-flex justify-content-center align-items-center">
        <div class=" bg-danger d-flex justify-content-center align-items-center">
           <h1 class="bg-white">Page Not Found</h1>
        </div>
     </div>
   `;
   var profile=`
   <div class="container mt-5 p-5">
   <div class="row justify-content-center mt-5">
       <div class="col-md-8">
           <div class="card profile-card">
               <div class="card-body text-center" id="profileData">
                
             
                  
               </div>
           </div>
       </div>
   </div>
</div>`
var routes = {
    '/': `${home}`,
    '/index.html': `${home}`,
    '/category/:id': `<h1>Hello from category</h1>`,
    '/subcategory/:id': '<h1> Product Details</h1><p>This is Product #1.</p>',
    '/product/:id': '<h1> Product Details</h1><p>This is Product #1.</p>',
    '/cart': `${cart}`,
    '/favourite': `${favourite}`,
    '/checkout': `${checkOut}`,
    '/search':`${search}`,
    '/allproducts':`<h1> All Products</h1>`,
    '/profile':`${profile}`
  };
  
  function navigate(event, path) {
    event.preventDefault();
    window.history.pushState({}, '', path);
    renderRoute(path);
    //window.scrollTo(0, 0);
  }

function renderRoute(path) {
    const content = document.getElementById('content');
    if (!content) {
        console.warn('Element #content not found');
        return;
    }
    content.innerHTML = routes[path] || `${notFound}`;
    if (path.startsWith('/category/')) {
      for (let i = 0; i < myA.length; i++) {
        myA[i].classList.remove("active")
      }
        var myCategoryId=Number((window.location.href.split('y/')[1])); 
        displayCategoryProducts(myCategoryId);
        return;
    } 
    if (path.startsWith('/subcategory/')) {
        var mySubcategoryId=Number((window.location.href.split('y/')[1])); 
        displaySubCategoryProducts(mySubcategoryId);
        return;
    } 
    if (path.startsWith('/favourite')) {
      for (let i = 0; i < myA.length; i++) {
        myA[i].classList.remove("active");
      }
  } 
    if (path.startsWith('/cart')) {
      for (let i = 0; i < myA.length; i++) {
        myA[i].classList.remove("active");
      }
  } 

    if (path.startsWith('/product/')) {
        var myProductId=Number((window.location.href.split('t/')[1]));
        displayProductDetails(myProductId);
        $('.owl-carousel').owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          responsive: {
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 4 }
          }
      });
        return;
    }
    if (path.startsWith('/product/')) {
        var myProductId=Number((window.location.href.split('t/')[1]));
        displayProductDetails(myProductId);
        $('.owl-carousel').owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          responsive: {
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 4 }
          }
      });
        return;
    } 

    if (path.startsWith('/allproducts')) {
      for (let i = 0; i < myA.length; i++) {
        myA[i].classList.remove("active")
      }
      displayAllProducts();
      // document.getElementById("allProducts").classList.add("active");
      return;
    }
    // تحقق من العنصر قبل استدعاء الدوال
    if (document.getElementById('macy-container')) {
        displaySubCategories(subcategories);
        initializeMacy(); // تأكد من إعادة تهيئة Macy.js
    }
    
    if (document.getElementById('myOwlCarousel')) {
        displayBestSeller(products);
        initializeOwlCarousel(); // تأكد من إعادة تهيئة OwlCarousel
    }
    if (document.getElementById('mySearchInput')) {
      mySearchInput=document.getElementById('mySearchInput');
      mySearchInput.focus();
      mySearchInput.addEventListener('input',function(){
        searchForProduct(mySearchInput.value);
      })
  }
  if (document.getElementById('cartItems')) {
   displayCartItems(myUser?.shoppingCart);
}
if (document.getElementById('favouriteItems')) {
  displayFavouriteItems(myUser?.favourite);
}
if (document.getElementById('orderSummary')) {
  displayCheckOut(myUser?.shoppingCart);
}
if (document.getElementById('profileData')) {
  displayProfile();
}
}

window.onpopstate = () => {
    renderRoute(window.location.pathname);
};

renderRoute(window.location.pathname);

function initializeMacy() {
    Macy({
        container: '#macy-container',
        trueOrder: false,
        waitForImages: false,
        margin: 24,
        columns: 3,
        breakAt: {
            1200: 3,
            940: 2,
            520: 1,
            400: 1
        }
    });
}


function initializeOwlCarousel() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 4 }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderRoute(window.location.pathname);
});


function displaySubCategories(subcategories){
    var containerSubCategories =``;
    for(let i=0;i<subcategories?.length;i++){
                containerSubCategories+=` <a href="/subcategory" onclick="navigate(event, '/subcategory/${subcategories[i].subCategoryId}')"><div class="macy-div"><img src="${subcategories[i].subCategoryImg}" alt="" class="macy-image "></div></a>`
    }
     document.getElementById('macy-container').innerHTML=containerSubCategories;
};
displaySubCategories(subcategories);

function displayBestSeller(products){
    var containerBestSeller =``;
    for(let i=0;i<products?.length;i++){
                    if(products[i].bestSeller){
                      const outOfStockDiv = products[i].numOfStock == 0 ? `<div class="out-of-stock">Out of Stock</div>` : '';
                      const heartIconClass = myUser?.favourite?.some(item => item.productId === products[i].productId) ? 'fa-solid text-danger' : 'fa-regular';
                        containerBestSeller+=`
                        <div class=" item  text-center bg-white rounded inner-item border border-bottom-1 ">
                        ${outOfStockDiv}
                        <div class="" onclick="navigate(event, '/product/${products[i].productId}')">
                          <img src="${products[i].imgSource}" alt="cake"class="w-100 mb-3">
                          <h3 class="my-3">${products[i].name}</h3>
                          <h5 class="my-3">${products[i].price} LE</h5>
                          <hr>
                          </div> 
                          <div class="mt-2 icon-containers d-flex justify-content-around align-items-center p-2 pb-3 ">
                              <i onclick="addToFavouriteInsideBestseller(${i})" class="${heartIconClass} fa-regular fa-heart "></i>
                              <i onclick="addToCart(${i})" class="fa-solid fa-cart-shopping "></i>
                          </div>
                        </div>
                      
                       `
                    }
    }
    document.getElementById('myOwlCarousel').innerHTML=containerBestSeller;

}
displayBestSeller(products);

function displayCategoryProducts(categoryId) {
    var categryProductContainer=``;
     categryProductContainer+=`<div class="container mt-5 p-3 py-5">
    <div class="row g-4 mt-5">`;
for (let i = 0; i < products?.length; i++) {
    if(products[i].categoryId==categoryId){
        const outOfStockDiv = products[i].numOfStock==0 ? `<div class="out-of-stock">Out of Stock</div>` : '';
        const isFavourite = myUser.favourite?.some(item => item.productId === products[i].productId);
        const heartIcon = isFavourite ? 'fa-solid text-danger' : 'fa-regular';
        categryProductContainer+=`
              <div class="col-lg-3 col-md-4 col-sm-6" >  
              <div class=" text-center bg-white  rounded inner-item position-relative">
              ${outOfStockDiv}
              <div class=" "onclick="navigate(event, '/product/${products[i].productId}')">
                <img src="${products[i].imgSource}" alt="${products[i].name}"class="w-100">
                <h3 class="my-3">${products[i].name}</h3>
                <h5 class="my-3">${products[i].price} LE</h5>
                <hr>
                <div class="mt-2 icon-containers d-flex justify-content-around align-items-center p-2 pb-3">
                    <i onclick="addToFavouriteInsideCategory(${i})" class="${heartIcon} fa-regular fa-heart "></i>
                    <i onclick="addToCart(${i})" class="fa-solid fa-cart-shopping "></i>
                </div>
              </div>
            </div> 
            </div>      
      `
    }
}
categryProductContainer+=`  </div>
</div>`
    const content = document.getElementById('content');
    content.innerHTML = categryProductContainer;
}

function displaySubCategoryProducts(subCategoryId) {
    var subcategryProductContainer=``;
     subcategryProductContainer+=`<div class="container mt-5 p-3">
    <div class="row g-4 mt-5">`;
for (let i = 0; i < products?.length; i++) {
    if(products[i].subCategoryId==subCategoryId){
        const outOfStockDiv = products[i].numOfStock==0 ? `<div class="out-of-stock">Out of Stock</div>` : '';
        const isFavourite = myUser.favourite?.some(item => item.productId === products[i].productId);
        const heartIcon = isFavourite ? 'fa-solid text-danger' : 'fa-regular';
        subcategryProductContainer+=`
              <div class="col-lg-3 col-md-4 col-sm-6" >  
              <div class=" text-center bg-white  rounded inner-item position-relative">
              ${outOfStockDiv}
              <div  onclick="navigate(event, '/product/${products[i].productId}')">
                <img src="${products[i].imgSource}" alt="${products[i].name}"class="w-100">
                <h3 class="my-3">${products[i].name}</h3>
                <h5 class="my-3">${products[i].price} LE</h5>
                <hr>
                </div> 
                <div class="mt-2 icon-containers d-flex justify-content-around align-items-center p-2 pb-3">
                    <i onclick="addToFavouriteInsideSubCategory(${i})" class="${heartIcon} fa-regular fa-heart "></i>
                    <i onclick="addToCart(${i})" class="fa-solid fa-cart-shopping "></i>
                </div>
              </div>
            
            </div>  
      `
    }
}
subcategryProductContainer+=`  </div>
</div>`
    const content = document.getElementById('content');
    content.innerHTML = subcategryProductContainer;
}


function displayProductDetails(productId) {
var productDetailsContainer=``;
var productSubCategory;
for(let i = 0; i < products.length; i++){

    if(products[i].productId==productId){
      let myproduct=products[i];
      productSubCategory=products[i].subCategoryId;
      const outOfStockDiv = myproduct.numOfStock == 0 ? `<div class="out-of-stock-2">Out of Stock</div>` : '';
      var heartIconClass = myUser?.favourite?.some(item => item.productId === products[i].productId) ? 'fa-solid text-danger' : 'fa-regular';

productDetailsContainer=`
<div class="container mt-5 p-2">
<div class="row mt-5 py-2">
  <div class="col-md-4  offset-md-1 offset-0 position-relative">
    ${outOfStockDiv}
    <img src="${products[i].imgSource}" alt="" class="w-100 rounded-2 ">
  </div>
 <div class="col-md-6 d-flex flex-column justify-content-around mt-md-0  mt-3 our-border">
 <div >
  <h1>${products[i].name}</h1>
  <h2>${products[i].price} LE</h2>
  <p>${products[i].desc}.</p>
 </div>
  <div class="mt-2 icon-containers d-flex justify-content-between align-items-center p-2 pb-3">
    <i onclick="addToFavouriteInsideProductDetails(${i})" class="${heartIconClass} fa-regular fa-heart "></i>
    <i onclick="addToCart(${i})" class="fa-solid fa-cart-shopping "></i>
</div>
 </div>
 </div>
`
    }
}
productDetailsContainer+=`<section id="" class="container text-center mt-3 py-5 px-5">
<h2>Similar Products</h2>
<div class="owl-carousel owl-theme p-3 bg-white" id="#myOwlCarousel">`
for(let i=0;i<products?.length;i++){
  if(products[i].subCategoryId==productSubCategory){
      const outOfStockDiv = products[i].numOfStock == 0 ? `<div class="out-of-stock">Out of Stock</div>` : '';
      productDetailsContainer+=`
      <div class=" item  text-center bg-white rounded inner-item border border-bottom-1 ">
      ${outOfStockDiv}
      <div class="" onclick="navigate(event, '/product/${products[i].productId}')">
        <img src="${products[i].imgSource}" alt="cake"class="w-100 mb-3">
        <h3 class="my-3">${products[i].name}</h3>
        <h5 class="my-3">${products[i].price} LE</h5>
        <hr>
        </div> 
        <div class="mt-2 icon-containers d-flex justify-content-around align-items-center p-2 pb-3 ">
            <i onclick="addToCart(${i})" class="fa-solid fa-cart-shopping "></i>
        </div>
      </div>  
     `
  }
}
productDetailsContainer+=`</div>
 </section>
`
    const content = document.getElementById('content');
    content.innerHTML = productDetailsContainer;
    
}



function searchForProduct(searchTerm){
  var containerSearch=``;
  if(searchTerm==" "||searchTerm.length==0){
    document.getElementById("searchContainer").innerHTML=`<h1>No Matched Item</h1>`
  }else{
  for(let i=0;i<products?.length;i++){
    if(products[i].name.toLowerCase().includes(searchTerm.toLowerCase()))
    {
      containerSearch+=`
      <div class="col-lg-3 col-md-4 col-sm-6" >  
      <div class=" text-center bg-white inner-item rounded ">
      <div class=" " onclick="navigate(event, '/product/${products[i].productId}')">
        <img src="${products[i].imgSource}" alt="${products[i].name}"class="w-100">
        <h3 class="my-3">${products[i].name}</h3>
        <h5 class="my-3">${products[i].price} LE</h5>
        <hr>
        </div>
        <div class="mt-2 icon-containers d-flex justify-content-around align-items-center p-2 pb-3">
            <i onclick="addToFavourite(${i})" class="fa-regular fa-heart "></i>
            <i onclick="addToCart(${i})" class="fa-solid fa-cart-shopping "></i>
        </div>
      </div>
      </div>`
    }
  }
}
  document.getElementById("searchContainer").innerHTML=containerSearch;
}


function displayAllProducts() {
  var allProductContainer = ``;
  allProductContainer += `<div class="container mt-5 p-3 py-5 text-center">
      <h1 class="mb-3 mt-3 myColor">Our Products</h1>
      <div class="row g-4 mt-3">`;

  for (let i = 0; i < products.length; i++) {
      // Check if  product is in favorite cart
      const isFavourite = myUser.favourite?.some(item => item.productId === products[i].productId);
      const heartIcon = isFavourite ? 'fa-solid text-danger' : 'fa-regular';

      // make product out of stock if numOfStock is 0
      const outOfStockDiv = products[i].numOfStock == 0 ?`<div class="out-of-stock">Out of Stock</div>` : '';

      allProductContainer += `
          <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="text-center bg-white rounded inner-item position-relative">
                  ${outOfStockDiv}
                  <div onclick="navigate(event, '/product/${products[i].productId}')">
                      <img src="${products[i].imgSource}" alt="${products[i].name}" class="w-100 product-image">
                      <h3 class="my-3">${products[i].name}</h3>
                      <h5 class="my-3">${products[i].price} LE</h5>
                  </div>
                  <div class="mt-2 icon-containers d-flex justify-content-around align-items-center p-2 pb-3">
                      <i onclick="addToFavourite(${i})" class="${heartIcon} fa-heart"></i>
                      <i onclick="addToCart(${i})" class="fa-solid fa-cart-shopping"></i>
                  </div>
              </div>
          </div>`;
  }

  allProductContainer += `</div></div>`;
  const content = document.getElementById('content');
  content.innerHTML = allProductContainer;
}



function addToCart(productIndex) {
  if (loginData) {
      const myProductId = products[productIndex].productId;
      const existingProduct = myUser.shoppingCart.find(product => product.productId === myProductId);

      if (existingProduct) {
          // Check if adding more exceeds the available stock
          if (Number(existingProduct.quantityInCart) + 1 > Number(products[productIndex].numOfStock)) {
              showNotification(`Cannot add more. Only ${products[productIndex].numOfStock} items available in stock.`, 'error');
          } else {
              // Increase the quantity in the cart
              existingProduct.quantityInCart += 1;
              totalProducts=0;
              for(let i=0;i<myUser.shoppingCart.length;i++){
                totalProducts+=Number(myUser.shoppingCart[i].quantityInCart);
              }
             document.getElementById("badge").innerText=totalProducts;
              localStorage.setItem("users", JSON.stringify(users));
              showNotification('Added to cart successfully!', 'success');
          }
      } else {
          // Check if the product is out of stock
          if (products[productIndex].numOfStock < 1) {
              showNotification(`Sorry, ${products[productIndex].name} is out of stock.`, 'error');
          } else {
              // Add the product to the cart with a quantity of 1
              const productToAdd = { ...products[productIndex], quantityInCart: 1 };
              myUser.shoppingCart.push(productToAdd);
              totalProducts=0;
              for(let i=0;i<myUser.shoppingCart.length;i++){
                totalProducts+=Number(myUser.shoppingCart[i].quantityInCart);
              }
              document.getElementById("badge").innerText=totalProducts;
              localStorage.setItem("users", JSON.stringify(users));
              showNotification('Added to cart successfully!','success');
          }
      }
  } else {
      showNotification('Please login to add items to your cart.', 'error');
  }
}



function displayCartItems(arr){
 subtotal=0;
  var cartContainer=``;
for(let i=0;i<arr?.length;i++){
cartContainer+=`<li class="cart-item row mb-3 align-items-center">
<!-- Product Image and Name -->
<div class="col-12 col-md-3 mb-3 mb-md-0">
    <img src="${arr[i].imgSource}" alt="${arr[i].name}" class="img-fluid">
    <h5 class="mt-2">${arr[i].name}</h5>
</div>

<!-- Price -->
<div class="col-6 col-md-2">
    <p class="">${arr[i].price} LE</p>
</div>

<!-- Quantity Controls -->
<div class="col-6 col-md-2">
    <div class="quantity-controls d-flex align-items-center">
        <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity('${arr[i].productId}')">-</button>
        <span>${arr[i].quantityInCart}</span>
        <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity('${arr[i].productId}')">+</button>
    </div>
</div>

<!-- Total -->
<div class="col-6 col-md-2">
    <p class="">EGP ${(Number(arr[i].price)*Number(arr[i].quantityInCart)).toFixed(2)}</p>
</div>

<!-- Action (Remove Button) -->
<div class="col-6 col-md-3">
    <button class="btn btn-danger btn-sm" onclick="removeItem('${arr[i].productId}')">Remove</button>  
    ${arr[i].quantityInCart >= arr[i].numOfStock ? '' : ''}
</div>
</li>`
subtotal+=(Number(arr[i].price)*Number(arr[i].quantityInCart));
}
document.getElementById("cartItems").innerHTML=cartContainer;

var subTotalElement=document.getElementById("subtotal");
subTotalElement.textContent=subtotal.toFixed(2);
}



increaseQuantity = function (productId) {
   const product = myUser.shoppingCart.find(product => product.productId === productId);
   var numQuantity=Number(product.quantityInCart);
  if (numQuantity<product.numOfStock) {
          numQuantity+=1
          product.quantityInCart=numQuantity;
          totalProducts=0;
              for(let i=0;i<myUser.shoppingCart.length;i++){
                totalProducts+=Number(myUser.shoppingCart[i].quantityInCart);
              }
          document.getElementById("badge").innerText=totalProducts;
          localStorage.setItem("users",JSON.stringify(users));
   }else{
    showNotification(`Cannot add more. Only ${product.numOfStock} items available in stock.`,'error');
   }
 displayCartItems(myUser.shoppingCart);  
};


decreaseQuantity = function (productId) {
  const product = myUser.shoppingCart.find(product => product.productId === productId);
  var numQuantity=Number(product.quantityInCart);
 if (numQuantity>1) {
         numQuantity-=1
         product.quantityInCart=numQuantity;
         totalProducts=0;
              for(let i=0;i<myUser.shoppingCart.length;i++){
                totalProducts+=Number(myUser.shoppingCart[i].quantityInCart);
              }
          document.getElementById("badge").innerText=totalProducts;
         localStorage.setItem("users",JSON.stringify(users));
  }else{
    removeItem(product.productId);
  }
displayCartItems(myUser.shoppingCart);
};


removeItem = function (productId) {
    let product=products.find(product=>product.productId==productId);
    if(product){
      product.quantityInCart=1;
    }
  myUser.shoppingCart = myUser.shoppingCart.filter(product => product.productId !== productId);
  totalProducts=0;
      for(let i=0;i<myUser.shoppingCart.length;i++){
                totalProducts+=Number(myUser.shoppingCart[i].quantityInCart);
              }
            document.getElementById("badge").innerText=totalProducts;
  localStorage.setItem("users",JSON.stringify(users));
  displayCartItems(myUser.shoppingCart);
};



function addToFavourite(productIndex) {
  if (loginData) {
      const myProductId = products[productIndex].productId;
      const existingProduct = myUser.favourite.find(product => product.productId === myProductId);

      if (existingProduct) {
          // Remove the product from the favourite cart
          myUser.favourite = myUser.favourite.filter(product => product.productId !== myProductId);
          showNotification('Removed from favourites!');
      } else {
          myUser.favourite.push(products[productIndex]);
          showNotification('Added to favourites!');
      }

      localStorage.setItem("users", JSON.stringify(users));
      displayAllProducts(); 
  } else {
      showNotification('Please login to add items to your favourites.', 'error');
  }
}


function addToFavouriteInsideCategory(productIndex) {
  if (loginData) {
      const myProductId = products[productIndex].productId;
      const existingProduct = myUser.favourite.find(product => product.productId === myProductId);

      if (existingProduct) {
          // Remove the product from the favourite cart
          myUser.favourite = myUser.favourite.filter(product => product.productId !== myProductId);
          showNotification('Removed from favourites!');
      } else {
          myUser.favourite.push(products[productIndex]);
          showNotification('Added to favourites!');
      }

      localStorage.setItem("users", JSON.stringify(users));
      displayCategoryProducts(products[productIndex].categoryId);
  } else {
      showNotification('Please login to add items to your favourites.', 'error');
  }
}

function addToFavouriteInsideSubCategory(productIndex) {
  if (loginData) {
      const myProductId = products[productIndex].productId;
      const existingProduct = myUser.favourite.find(product => product.productId === myProductId);

      if (existingProduct) {
          // Remove the product from the favourite cart
          myUser.favourite = myUser.favourite.filter(product => product.productId !== myProductId);
          showNotification('Removed from favourites!');
      } else {
          myUser.favourite.push(products[productIndex]);
          showNotification('Added to favourites!');
      }

      localStorage.setItem("users", JSON.stringify(users));
      displaySubCategoryProducts(products[productIndex].subCategoryId); 
  } else {
      showNotification('Please login to add items to your favourites.', 'error');
  }
}


function addToFavouriteInsideProductDetails(productIndex) {
  if (loginData) {
      const myProductId = products[productIndex].productId;
      const existingProduct = myUser.favourite.find(product => product.productId === myProductId);

      if (existingProduct) {
          // Remove the product from the favourite cart
          myUser.favourite = myUser.favourite.filter(product => product.productId !== myProductId);
          showNotification('Removed from favourites!');
      } else {
          myUser.favourite.push(products[productIndex]);
          showNotification('Added to favourites!');
      }

      localStorage.setItem("users", JSON.stringify(users));
      // displayProductDetails(myProductId);
      navigate(event, `/product/${myProductId}`);
  } else {
      showNotification('Please login to add items to your favourites.', 'error');
  }
}

function addToFavouriteInsideBestseller(productIndex) {
  if (loginData) {
      const myProductId = products[productIndex].productId;
      const existingProduct = myUser.favourite.find(product => product.productId === myProductId);

      if (existingProduct) {
          // Remove the product from the favourite cart
          myUser.favourite = myUser.favourite.filter(product => product.productId !== myProductId);
          showNotification('Removed from favourites!');
      } else {
          myUser.favourite.push(products[productIndex]);
          showNotification('Added to favourites!');
      }

      localStorage.setItem("users", JSON.stringify(users));
      navigate(event, '/');
  } else {
      showNotification('Please login to add items to your favourites.', 'error');
  }
}

function addToFavouriteInsideSimilarProducts(productIndex) {
  if (loginData) {
      const myProductId = products[productIndex].productId;
      const existingProduct = myUser.favourite.find(product => product.productId === myProductId);

      if (existingProduct) {
          // Remove the product from the favourite cart
          myUser.favourite = myUser.favourite.filter(product => product.productId !== myProductId);
          showNotification('Removed from favourites!');
      } else {
          myUser.favourite.push(products[productIndex]);
          showNotification('Added to favourites!');
      }

      localStorage.setItem("users", JSON.stringify(users));
      // var location=window.location.href;
      // console.log((window.location.href.split('t/')[1]));
      let myId=window.location.href.split('t/')[1];
      
      navigate(event, `/product/${myId}`);
  } else {
      showNotification('Please login to add items to your favourites.', 'error');
  }
}



function displayFavouriteItems(arr){
    var favouriteContainer=``;
 
  for(let i=0;i<arr?.length;i++){
    var myIndexInMyData=products.find(product => product.productId==arr[i].productId);
    const outOfStockDiv = arr[i].numOfStock==0 ?`<div class="out-of-stock-2">Out of Stock</div>` : '';
    favouriteContainer+=`
    <li class="cart-item row mb-3 align-items-center">
      <!-- Product Image and Name -->
      <div class="col-12 col-md-3 mb-3 mb-md-0 position-relative">
        ${outOfStockDiv}
        <img src="${arr[i].imgSource}" alt="${arr[i].name}" class="img-fluid">
        <h5 class="mt-2">${arr[i].name}</h5>
      </div>
  
      <!-- Price -->
      <div class="col-6 col-md-2">
        <p class="">${arr[i].price} LE</p>
      </div>
  

      <div class="col-6 col-md-2">
        <i onclick="addToCart(${products.indexOf(myIndexInMyData)})" class="fa-solid fa-cart-shopping "></i>
      </div>
 
      <!-- Action (Remove Button) -->
      <div class="col-6 col-md-3">
        <button class="btn btn-danger btn-sm" onclick="removeItemFromFavourite('${arr[i].productId}')">Remove</button>  
      </div>
    </li>`
  }
  document.getElementById("favouriteItems").innerHTML=favouriteContainer;
};



removeItemFromFavourite = function (productId) {
  myUser.favourite = myUser.favourite.filter(product => product.productId !== productId);
  localStorage.setItem("users",JSON.stringify(users));
  displayFavouriteItems(myUser.favourite);
};



function displayCheckOut(arr){
 let subtotal=0;
   var checkoutContainer=``;
 for(let i=0;i<arr?.length;i++){
 checkoutContainer+=`
 <li>
   <span class="myColor">${arr[i].name} (${arr[i].quantityInCart})</span>
   <span class="myColor">EGP ${(Number(arr[i].price)) *(Number(arr[i].quantityInCart))}</span>
   ${ (Number(arr[i].quantityInCart))>= (Number(arr[i].numOfStock)) ? '' : ''}
   </li>`
 subtotal+=(Number(arr[i].price)*Number(arr[i].quantityInCart));
 }
 document.getElementById("orderSummary").innerHTML=checkoutContainer;
 
 var subTotalElement=document.getElementById("checkOutSubtotal");
 subTotalElement.textContent=subtotal.toFixed(2);
};



// Clear previous error messages
function ClearErrorMessages(){
  document.querySelectorAll('.error-message').forEach((el) => {
    el.textContent = '';
    el.style.display = 'none';
    });
  document.querySelectorAll('.form-control').forEach((el) => {
    el.classList.remove('error');
    });
    }
  
  
  function validateCheckout(name, email, address, cardnumber, expiry, cvv) {
    let regexname = /^[A-Za-z\s]+$/;
    let regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let regexaddress = /^[A-Za-z0-9\s\-,.]+$/;
    let regexcardnumber = /^[0-9]{16}$/; 
    let regexexpiry = /^(0[1-9]|1[0-2])\/(2[5-9]|[3-9]\d)$/; 
    let regexcvv = /^\d{3,4}$/; 
  
    let isValid = true;
  
    ClearErrorMessages();
  
    if (!regexname.test(name.value)) {
        document.getElementById('name-error').textContent = 'Please enter a valid name. Only letters and spaces are allowed.';
        document.getElementById('name-error').style.display = 'block';
        name.classList.add('error');
        isValid = false;
        document.getElementById("name").addEventListener("input", ClearErrorMessages);   
    }else{
      if (!regexemail.test(email.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        document.getElementById('email-error').style.display = 'block';
        email.classList.add('error');
        isValid = false;
        document.getElementById("email").addEventListener("input", ClearErrorMessages);   
  
    }else{
      if (!regexaddress.test(address.value)) {
        document.getElementById('address-error').textContent = 'Please enter a valid address. Only letters, numbers, and spaces are allowed.';
        document.getElementById('address-error').style.display = 'block';
        address.classList.add('error');
        isValid = false;
        document.getElementById("address").addEventListener("input", ClearErrorMessages);   
  
    }else{
      if (!regexcardnumber.test(cardnumber.value)) {
        document.getElementById('card-error').textContent = 'Please enter a valid 16-digit card number.';
        document.getElementById('card-error').style.display = 'block';
        cardnumber.classList.add('error');
        isValid = false;
        document.getElementById("card").addEventListener("input", ClearErrorMessages);   
  
    }else{
      if (!regexexpiry.test(expiry.value)) {
        document.getElementById('expiry-error').textContent = 'Please enter a valid expiry date in MM/YY format. The year should be 2025 or later.';
        document.getElementById('expiry-error').style.display = 'block';
        expiry.classList.add('error');
        isValid = false;
        document.getElementById("expiry").addEventListener("input", ClearErrorMessages);   
  
    }else{
      if (!regexcvv.test(cvv.value)) {
        document.getElementById('cvv-error').textContent = 'Please enter a valid CVV. It should be 3 or 4 digits.';
        document.getElementById('cvv-error').style.display = 'block';
        cvv.classList.add('error');
        isValid = false;
        document.getElementById("cvv").addEventListener("input", ClearErrorMessages);   
  
    }
    }
    }
    }
    }
    }
  return isValid;}


  function ClearCheckoutForm()
  {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('card').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('cvv').value = '';
  } 

handleCheckout = function () {
  if (myUser.shoppingCart.length === 0) {
      showNotification('Your cart is empty. Please add products before checking out.','error');
  }else if(validateCheckout(document.querySelector('#name'),document.querySelector('#email'),document.querySelector('#address'),document.querySelector('#card'),document.querySelector('#expiry'),document.querySelector('#cvv'))) {
      for(let i=0;i<myUser.shoppingCart.length;i++){
        let product=products.find(product=>product.productId==myUser.shoppingCart[i].productId);
        if(product){
          product.numOfStock=Number(product.numOfStock)-Number(myUser.shoppingCart[i].quantityInCart);
           product.quantityInCart=1;
          localStorage.setItem("products",JSON.stringify(products));
        }
      }
         // Save current cart to order history
      const order = {
        date: new Date().toISOString(),
        items: [...myUser.shoppingCart] // Create a copy of the cart items
      };

      if (!myUser.orderHistory) {
        myUser.orderHistory = []; // Initialize order history if it doesn't exist
      }
      myUser.orderHistory.push(order);
      
      myUser.shoppingCart=[];
      localStorage.setItem("users",JSON.stringify(users));
      document.getElementById("badge").innerText=myUser.shoppingCart.length;
      ClearCheckoutForm();

      // console.log(myUser);
      showNotification('Thank you for your order!','success');
      displayCheckOut(myUser.shoppingCart);
    //   setTimeout(() => {
    //   navigate(event,'/');
    // }, 3000);
   }
};




function logout(){
  loginData=null;
  localStorage.removeItem("loginData");
  displayProfile();
  document.getElementById("badge").classList.toggle("d-none")
}


function displayProfile(){
             var profileContainer=`
                <div class="profile-picture-container">
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMTIgMkM2LjQ3OSAyIDIgNi40NzkgMiAxMnM0LjQ3OSAxMCAxMCAxMCAxMC00LjQ3OSAxMC0xMFMxNy41MjEgMiAxMiAyem0wIDJjMi4yMTEgMCA0IDIuMDMgNCA0LjVhNC41MDYgNC41MDYgMCAwIDEtNC41IDQuNUg4LjVjLTIuNDcgMC00LjUtMS43ODktNC41LTQgMC0yLjQ3IDIuMDMtNC41IDQuNS00LjV6bTAgMTQuNWMtMy4zNjMgMC02LTEuNDQxLTYtMy41aDEyYzAgMi4wNTktMi42MzcgMy41LTYgMy41eiIvPjwvc3ZnPg==" 
                      class="profile-picture male-avatar" 
                      id="profileImage"
                      alt="Profile Picture">
                  <button class="upload-button" onclick="document.getElementById('fileInput').click()"></button>
                  <input type="file" id="fileInput" accept="image/*" onchange="previewImage(event)">
                  </div> 
                  <h2 class="card-title">${loginData?myUser.name:"You need To Login"}</h2>
                  <h3>${loginData?myUser.email:""}</h3>
                  <h3>
                  ${loginData?myUser.phone:""}
                  </h3>
                  ${loginData?`<span class="btn btn-outline-dark" onclick="logout()">Logout</span>`:""}
                 
              </div>`
              document.getElementById("profileData").innerHTML=profileContainer
              function previewImage(event) {
                const input = event.target;
                const profileImage = document.getElementById('profileImage');
                
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        profileImage.src = e.target.result;
                        profileImage.classList.remove('male-avatar');
                    }
                    
                    reader.readAsDataURL(input.files[0]);
                }
            }
}
function previewImage(event) {
  const input = event.target;
  const profileImage = document.getElementById('profileImage');
  
  if (input.files && input.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
          profileImage.src = e.target.result;
          profileImage.classList.remove('male-avatar');
      }
      
      reader.readAsDataURL(input.files[0]);
  }
}


// Function to notify the user instead of alert
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');

  notificationMessage.textContent = message;
  notification.className = `notification ${type}`;

  notification.style.display = 'block';

  setTimeout(() => {
      notification.style.display = 'none';
  }, 3000);
}



//Footer JS
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map
  const map = L.map('map').setView([31.2001, 29.9187], 13);

  // Add the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);

  // Get user's geolocation
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const { latitude, longitude } = position.coords;
              map.setView([latitude, longitude], 15); // Zoom in on the user's location

              // Add a marker for the user's location
              L.marker([latitude, longitude]).addTo(map)
                  .bindPopup('You are here!')
                  .openPopup();
          },
          (error) => {
              console.error('Geolocation failed:', error.message);
              showNotification('Unable to retrieve your location. Using default location.','error');

              // Fallback to a default location (Alexandria, Egypt)
              L.marker([31.2001, 29.9187]).addTo(map)
                  .bindPopup('Sugarilo Location')
                  .openPopup();
          }
      );
  } else {
      showNotification('Geolocation is not supported by your browser. Using default location.','error');

      // Fallback to a default location (Alexandria, Egypt)
      L.marker([31.2001, 29.9187]).addTo(map)
          .bindPopup('Sugarilo Location')
          .openPopup();
  }
});
  
