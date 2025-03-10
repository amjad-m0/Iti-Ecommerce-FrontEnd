import { Admin } from './adminDB.js';

document.addEventListener("DOMContentLoaded", () => {
  const userSearchInput = document.getElementById("user-search-input");
  const userList = document.getElementById("user-list");
  const categorySelect = document.getElementById("category-select");
  const statusSelect = document.getElementById("status-select");
  const addSellerBtn = document.getElementById("add-seller-btn");
  const messageDiv = document.getElementById("message");

  // Load users and categories from local storage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const sellers = JSON.parse(localStorage.getItem("sellers")) || [];

  // Populate category dropdown
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.categoryId;
    option.textContent = category.categoryName;
    categorySelect.appendChild(option);
  });

  // Show user list when input is focused
  userSearchInput.addEventListener("focus", () => {
    userList.style.display = "block";
  });

  // Hide user list when input loses focus
  userSearchInput.addEventListener("blur", () => {
    setTimeout(() => {
      userList.style.display = "none";
    }, 200); // Delay to allow click event on user list
  });

  // Search for users
  userSearchInput.addEventListener("input", () => {
    const searchTerm = userSearchInput.value.toLowerCase();
    userList.innerHTML = ""; // Clear previous results
    messageDiv.textContent = ""; // Clear previous messages

    if (searchTerm === "") {
      messageDiv.textContent = "Please enter an email to search.";
      return;
    }

    const matchedUsers = users.filter(user => 
      user.email.toLowerCase().includes(searchTerm)
    );

    if (matchedUsers.length > 0) {
      matchedUsers.forEach(user => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.dataset.userId = user.userId;
        listItem.textContent = `${user.name} (${user.email})`;
        userList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = "User not found";
      userList.appendChild(listItem);
    }
  });

  // Handle user selection from search results
  userList.addEventListener("mousedown", (event) => {
    if (event.target.tagName === "LI") {
      const selectedUserId = event.target.dataset.userId;
      const selectedUser = users.find(user => user.userId === selectedUserId);
      if (selectedUser) {
        userSearchInput.value = `${selectedUser.name} (${selectedUser.email})`;
        userSearchInput.dataset.userId = selectedUserId;
        userList.style.display = "none"; // Hide user list after selection
        // console.log("Selected userId:", selectedUserId); // Debugging statement
      }
    }
  });

  addSellerBtn.addEventListener("click", () => {
    const userId = userSearchInput.dataset.userId;
    const category = categorySelect.value;
    const status = statusSelect.value;

    messageDiv.textContent = ""; // Clear previous messages

    if (!userId || !category || !status) {
      messageDiv.textContent = "Please fill in all fields.";
      // console.log("userId:", userId, "category:", category, "status:", status); // Debugging statement
      return;
    }

    const user = users.find(user => user.userId === userId);
    if (!user) {
      messageDiv.textContent = "User not found.";
      return;
    }

    // Check if the seller already exists
    const existingSeller = sellers.find(seller => seller.sellerId === userId);
    if (existingSeller) {
      messageDiv.textContent = "Seller already exists.";
      return;
    }

    const newSeller = {
      sellerId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      businessName: category,
      status: status,
      rating: 0,
      salesVolume: 0
    };

    Admin.addSeller(newSeller);
    messageDiv.textContent = "Seller added successfully.";
    setTimeout(() => {
      window.location.href = 'admin.html'; // Redirect to the admin panel
    }, 1000);
  });
});