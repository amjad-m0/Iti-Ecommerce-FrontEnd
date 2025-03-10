import { Admin } from './adminDB.js';
import { getValueByKey } from './localstorage.js';

document.addEventListener("DOMContentLoaded", () => {
  const sellerId = new URLSearchParams(window.location.search).get('sellerId');
  const sellerInfoDiv = document.getElementById("seller-info");
  const deleteSellerBtn = document.getElementById("delete-seller-btn");
  const changeStatusDropdown = document.getElementById("change-status-dropdown");
  const changeStatusBtn = document.getElementById("change-status-btn");

  const displaySellerInfo = (seller, products) => {
    // Map product IDs to product names with links
    const productLinks = seller.productListings.map(productId => {
      const product = products.find(product => product.productId === productId);
      return product ? `<a href="product.html?productId=${productId}" class="myColor">${product.name}</a>` : 'Unknown Product';
    });

    sellerInfoDiv.innerHTML = `
      <p class="myColor"><strong>ID:</strong> ${seller.sellerId}</p>
      <p class="myColor"><strong>Name:</strong> ${seller.name}</p>
      <p class="myColor"><strong>Email:</strong> ${seller.email}</p>
      <p class="myColor"><strong>Phone:</strong> ${seller.phone}</p>
      <p class="myColor"><strong>City:</strong> ${seller.city}</p>
      <p class="myColor"><strong>District:</strong> ${seller.district}</p>
      <p class="myColor"><strong>Address:</strong> ${seller.address}</p>
      <p class="myColor"><strong>Business Name:</strong> ${seller.businessName}</p>
      <p class="myColor"><strong>Status:</strong> ${seller.status}</p>
      <p class="myColor"><strong>Rating:</strong> ${seller.rating}</p>
      <p class="myColor"><strong>Reviews Count:</strong> ${seller.reviewsCount}</p>
      <p class="myColor"><strong>Sales Volume:</strong> ${seller.salesVolume}</p>
      <p class="myColor"><strong>Payment Method:</strong> ${seller.paymentMethod}</p>
      <p class="myColor"><strong>Earnings:</strong> $${seller.earnings}</p>
      <p class="myColor"><strong>Product Listings:</strong> ${productLinks.join(', ')}</p>
      <p class="myColor"><strong>Discount Offers:</strong> ${seller.discountOffers.length > 0 ? seller.discountOffers.join(', ') : 'None'}</p>
    `;
  };

  // Fetch seller data from localStorage
  var sellersArray = getValueByKey('sellers') || [];
  var productsArray = getValueByKey('products') || [];

  const seller = sellersArray.find(seller => seller.sellerId === sellerId);
  if (seller) {
    displaySellerInfo(seller, productsArray);
  } else {
    console.error("Seller not found.");
    sellerInfoDiv.innerHTML = '<p>Seller not found.</p>';
  }

  deleteSellerBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this seller?")) {
      // Implement delete seller functionality
      Admin.deleteSeller(sellerId);
      showNotification("Seller deleted successfully.");
      window.location.href = 'admin.html'; // Redirect to the admin panel
    }
  });

  changeStatusBtn.addEventListener("click", () => {
    const newStatus = changeStatusDropdown.value;
    if (newStatus) {
      // Implement change status functionality
      Admin.changeItemStatus('sellers', sellerId, newStatus);
      showNotification("Status changed successfully.");
      window.location.reload(); // Reload the page to reflect the changes
    } else {
      showNotification("Please select a status.");
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