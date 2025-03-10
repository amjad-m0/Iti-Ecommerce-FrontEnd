import { Admin } from './adminDB.js';
import { deleteItemById, getValueByKey, saveValueByKey } from './localstorage.js';

document.addEventListener("DOMContentLoaded", () => {
  const productId = new URLSearchParams(window.location.search).get('productId');
  const productInfoDiv = document.getElementById("product-info");
  const deleteProductBtn = document.getElementById("delete-product-btn");
  const changePriceInput = document.getElementById("change-price-input");
  const changePriceBtn = document.getElementById("change-price-btn");

  if (!productInfoDiv || !deleteProductBtn || !changePriceInput || !changePriceBtn) {
    console.error("One or more elements not found in the DOM.");
    return;
  }

  const displayProductInfo = (product) => {
    const sellers = getValueByKey('sellers') || [];
    const categories = getValueByKey('categories') || [];
    const subcategories = getValueByKey('subcategories') || [];

    // Find the seller
    const seller = sellers.find(seller => seller.productListings.includes(product.productId));
    const sellerName = seller ? seller.name : 'Unknown Seller';

    // Find the category
    const category = categories.find(category => category.categoryId === product.categoryId);
    const categoryName = category ? category.categoryName : 'Unknown Category';

    // Find the subcategory
    const subcategory = subcategories.find(subcategory => subcategory.subCategoryId === product.subCategoryId);
    const subcategoryName = subcategory ? subcategory.subCategoryName : 'Unknown Subcategory';

    productInfoDiv.innerHTML = `
    <img src="${product.imgSource}" alt="${product.name}" class="img-fluid" style="width: 300px; height: auto; padding: 10px; margin:10px auto; display: block; border: 1px solid #ddd; border-radius: 10px;">
      <p class="myColor"><strong>ID:</strong> ${product.productId}</p>
      <p class="myColor"><strong>Name:</strong> ${product.name}</p>
      <p class="myColor"><strong>Price:</strong> $<span id="product-price">${product.price}</span></p>
      <p class="myColor"><strong>Stock:</strong> ${product.numOfStock}</p>
      <p class="myColor"><strong>Description:</strong> ${product.desc || 'No description available'}</p>
      <p class="myColor"><strong>Category:</strong> ${categoryName}</p>
      <p class="myColor"><strong>Subcategory:</strong> ${subcategoryName}</p>
      <p class="myColor"><strong>Seller:</strong> ${sellerName}</p>
      <p class="myColor"><strong>Best Seller:</strong> ${product.bestSeller ? 'Yes' : 'No'}</p>
    `;
  };

  // Fetch product data from localStorage
  const products = getValueByKey('products') || [];
  const product = products.find(product => product.productId === productId);

  if (product) {
    displayProductInfo(product);
  } else {
    productInfoDiv.innerHTML = '<p>Product not found.</p>';
  }

  deleteProductBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this product?")) {
      // Delete product from localStorage
      deleteItemById('products', productId);

      // Update seller's product listings
      let sellers = getValueByKey('sellers') || [];
      sellers.forEach(seller => {
        console.log(productId);
        seller.productListings = seller.productListings.filter(id => id !== productId);
      });
      saveValueByKey('sellers', sellers);

      showNotification("Product deleted successfully.");

      // Redirect based on logged-in user
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const sellerId = localStorage.getItem('sellerId');
      if (isLoggedIn && sellerId) {
        window.location.href = 'sellerDashboard.html';
      } else {
        window.location.href = 'admin.html';
      }
    }
  });

  changePriceBtn.addEventListener("click", () => {
    const newPrice = parseFloat(changePriceInput.value);
    if (!isNaN(newPrice) && newPrice >= 0) {
      // Implement change price functionality
      Admin.changeProductPrice(productId, newPrice);
      showNotification("Price changed successfully.");
      // Update the displayed price
      document.getElementById("product-price").innerText = newPrice.toFixed(2);
    } else {
      showNotification("Please enter a valid price.");
    }
  });
});

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