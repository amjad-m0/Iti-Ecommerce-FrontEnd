import { Admin } from './adminDB.js';
import { getValueByKey } from './localstorage.js';

document.addEventListener("DOMContentLoaded", async () => {
  // Navigation by toggling sections
  const sections = document.querySelectorAll(".section");
  const buttons = document.querySelectorAll("nav button");

  // Initially hide all sections except the dashboard
  sections.forEach(section => section.classList.add("hidden"));
  document.getElementById("dashboard-section").classList.remove("hidden");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sections.forEach(section => section.classList.add("hidden"));
      const targetSection = document.getElementById(btn.getAttribute("data-target"));
      if (targetSection) {
        targetSection.classList.remove("hidden");
        window.history.pushState({ section: targetSection.id }, '', `#${targetSection.id}`);
      }
    });
  });

  // Handle back and forward buttons of the browser
  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.section) {
      sections.forEach(section => section.classList.add("hidden"));
      const targetSection = document.getElementById(event.state.section);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }
    }
  });

  var sellersArray = getValueByKey('sellers') || [];

  // function loop on seller names
  function sellerNames() {
    var sellers_names = [];
    sellersArray.forEach(seller => {
      sellers_names.push(seller.name);
    });
    return (sellers_names);
  }

  sellerNames();

  // function loop on seller solditems
  function sellerSalesVolume() {
    var salesVolume = [];
    sellersArray.forEach(seller => {
      salesVolume.push(seller.salesVolume);
    });
    return (salesVolume);
  }

  sellerSalesVolume()

  // function loop on seller earnings
  function sellerEarnings() {
    var Earnings = [];
    sellersArray.forEach(seller => {
      Earnings.push(seller.earnings);
    });
    return (Earnings);
  }

  sellerEarnings()

  var canvasElements = document.getElementById("sellerChart");
  var data_local_storage = {
    type: "bar",
    data: {
      labels: sellerNames(),
      datasets: [{
        label: "number of sold items",
        data: sellerSalesVolume(),
        backgroundColor: "pink",
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },

      {
        label: "Earnings",
        data: sellerEarnings(),
        backgroundColor: "#a63f5e",
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    }
  };
  var sellerChart = new Chart(canvasElements, data_local_storage);

  // User Management
  const userList = document.getElementById("user-list");
  const searchUserInput = document.getElementById("search-user");
  const searchButton = document.getElementById("searchUser");
  const allUsersButton = document.getElementById("allusers");

  let users = [];

  const renderUsers = (usersToRender) => {
    userList.innerHTML = '';
    if (usersToRender.length === 0) {
      userList.innerHTML = '<li class="list-group-item">No users found.</li>';
      return;
    }
    usersToRender.forEach(user => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `
        <span class="user-data" data-user-id="${user.userId}">
          Name: ${user.name} <br>
          Email: ${user.email}<br>
          <button class="user-name btn myBColor text-white" data-user-id="${user.userId}">Profile</button>
        </span>
      `;
      userList.appendChild(li);
    });

    // Add event listener to each user name to redirect to user account page
    const userNames = document.querySelectorAll(".user-name");
    userNames.forEach(userName => {
      userName.addEventListener("click", (e) => {
        const userId = e.target.getAttribute("data-user-id");
        window.location.href = `userprofile.html?userId=${userId}`;
      });
    });
  };

  const viewUsers = () => {
    users = Admin.viewCustomers();
    renderUsers(users);
  };

  const searchUsers = (query) => {
    if (!query) {
      userList.innerHTML = '<li class="list-group-item">Please enter a search query.</li>';
      return;
    }
    if (users.length === 0) {
      users = Admin.viewCustomers();
    }
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.userId.toString().includes(query)
    );
    renderUsers(filteredUsers);
    searchUserInput.value = ''; // Clear the search input box
  };

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const query = searchUserInput.value;
      searchUsers(query);
    });
  }

  if (searchUserInput) {
    searchUserInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchUserInput.value;
        searchUsers(query);
      }
    });
  }

  if (allUsersButton) {
    allUsersButton.addEventListener("click", () => {
      viewUsers();
    });
  }

  // Seller Management
  const sellerList = document.getElementById("seller-list");
  const searchSellerInput = document.getElementById("search-seller");
  const searchSellerButton = document.getElementById("searchSellerButton");
  const allSellersButton = document.getElementById("allSellers");
  const addSellerButton = document.getElementById("addSeller");

  let sellers = [];

  const renderSellers = (sellersToRender) => {
    sellerList.innerHTML = '';
    if (sellersToRender.length === 0) {
      sellerList.innerHTML = '<li class="list-group-item">No sellers found.</li>';
      return;
    }
    sellersToRender.forEach(seller => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `
        <span class="seller-data" data-seller-id="${seller.sellerId}">
          Name: ${seller.name} <br>
          Email: ${seller.email}<br>
          Category: ${seller.businessName}<br>
          Status: ${seller.status}<br>
          Rating: ${seller.rating}<br>
          Sales volume: ${seller.salesVolume}<br>
          <button class="seller-name btn myBColor text-white" data-seller-id="${seller.sellerId}">Profile</button>
        </span>
      `;
      sellerList.appendChild(li);
    });

    // Add event listener to each seller name to redirect to seller account page
    const sellerNames = document.querySelectorAll(".seller-name");
    sellerNames.forEach(sellerName => {
      sellerName.addEventListener("click", (e) => {
        const sellerId = e.target.getAttribute("data-seller-id");
        window.location.href = `seller.html?sellerId=${sellerId}`;
      });
    });
  };

  const viewSellers = () => {
    sellers = Admin.viewSellers();
    renderSellers(sellers);
  };

  const searchSellers = (query) => {
    if (!query) {
      sellerList.innerHTML = '<li class="list-group-item">Please enter a search query.</li>';
      return;
    }
    if (sellers.length === 0) {
      sellers = Admin.viewSellers();
    }
    const filteredSellers = sellers.filter(seller =>
      seller.name.toLowerCase().includes(query.toLowerCase()) ||
      seller.email.toLowerCase().includes(query.toLowerCase()) ||
      seller.sellerId.toString().includes(query)
    );
    renderSellers(filteredSellers);
    searchSellerInput.value = ''; // Clear the search input box
  };

  if (searchSellerButton) {
    searchSellerButton.addEventListener("click", () => {
      const query = searchSellerInput.value;
      searchSellers(query);
    });
  }

  if (searchSellerInput) {
    searchSellerInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchSellerInput.value;
        searchSellers(query);
      }
    });
  }

  if (allSellersButton) {
    allSellersButton.addEventListener("click", () => {
      viewSellers();
    });
  }

  if (addSellerButton) {
    addSellerButton.addEventListener("click", () => {
      window.location.href = 'addseller.html';
    });
  }

  // Product Management
  const productList = document.getElementById("product-list");
  const searchProductInput = document.getElementById("search-product");
  const searchProductButton = document.getElementById("searchProductButton");
  const allProductsButton = document.getElementById("allProducts");

  let products = [];

  const renderProducts = (productsToRender) => {
    productList.innerHTML = '';
    if (productsToRender.length === 0) {
      productList.innerHTML = '<li class="list-group-item">No products found.</li>';
      return;
    }
    productsToRender.forEach(product => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `
        <span class="product-data" data-product-id="${product.productId}">
          Name: ${product.name} <br>
          Price: $${product.price}<br>
          <button class="product-name btn myBColor text-white" data-product-id="${product.productId}">Profile</button>
        </span>
      `;
      productList.appendChild(li);
    });

    // Add event listener to each product name to redirect to product details page
    const productNames = document.querySelectorAll(".product-name");
    productNames.forEach(productName => {
      productName.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-product-id");
        window.location.href = `product.html?productId=${productId}`;
      });
    });
  };

  const viewProducts = () => {
    products = Admin.viewProducts();
    renderProducts(products);
  };

  const searchProducts = (query) => {
    if (!query) {
      productList.innerHTML = '<li class="list-group-item">Please enter a search query.</li>';
      return;
    }
    if (products.length === 0) {
      products = Admin.viewProducts();
    }
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.productId.toString().includes(query)
    );
    renderProducts(filteredProducts);
    searchProductInput.value = ''; // Clear the search input box
  };

  if (searchProductButton) {
    searchProductButton.addEventListener("click", () => {
      const query = searchProductInput.value;
      searchProducts(query);
    });
  }

  if (searchProductInput) {
    searchProductInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchProductInput.value;
        searchProducts(query);
      }
    });
  }

  if (allProductsButton) {
    allProductsButton.addEventListener("click", () => {
      viewProducts();
    });
  }

  const logoutButton = document.getElementById('logoutButton');

  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('isLoggedIn'); // Clear login flag
      window.history.pushState(null, null, 'auth.html'); // Push a new state with login page
      window.location.href = 'auth.html'; // Redirect to login page
    });
  }
});