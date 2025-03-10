import { getValueByKey, saveValueByKey } from './localstorage.js';

document.addEventListener("DOMContentLoaded", () => {
  const userId = new URLSearchParams(window.location.search).get('userId');
  const userInfoDiv = document.getElementById("user-info");
  const deleteUserBtn = document.getElementById("delete-user-btn");
  const changeStatusDropdown = document.getElementById("change-status-dropdown");
  const changeStatusBtn = document.getElementById("change-status-btn");

  const displayUserInfo = (user) => {
    userInfoDiv.innerHTML = `
      <p  class="myColor"><strong>ID:</strong> ${user.userId}</p>
      <p  class="myColor"><strong>Name:</strong> ${user.name}</p>
      <p  class="myColor"><strong>Email:</strong> ${user.email}</p>
      <p  class="myColor"><strong>Phone:</strong> ${user.phone}</p>
      <p  class="myColor"><strong>Status:</strong> ${user.status}</p>
      <p  class="myColor"><strong>Address:</strong> ${user.address}</p>
    `;
  };

  // Fetch user data from localStorage
  var users = getValueByKey('users') || [];

  const user = users.find(user => user.userId === userId);

  if (user) {
    displayUserInfo(user);
  } else {
    userInfoDiv.innerHTML = '<p>User not found.</p>';
  }

  changeStatusBtn.addEventListener("click", () => {
    const newStatus = changeStatusDropdown.value;
    if (newStatus) {
      // Update user status in localStorage
      user.status = newStatus;
      saveValueByKey('users', users);
      showNotification("Status changed successfully.");
      displayUserInfo(user); // Update displayed information
    } else {
      showNotification("Please select a status.");
    }
  });

  deleteUserBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this user?")) {
      // Implement delete user functionality
      const updatedUsers = users.filter(u => u.userId !== userId);
      saveValueByKey('users', updatedUsers);
      showNotification("User deleted successfully.");
      window.location.href = 'admin.html'; // Redirect to the admin panel
    }
  });
});