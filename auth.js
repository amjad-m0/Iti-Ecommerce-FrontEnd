import { User } from './customerDB.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailHelp = document.getElementById("emailHelp");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      emailHelp.innerText = "Please enter both email and password.";
      emailHelp.classList.add("text-danger");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    const storedSellers = JSON.parse(localStorage.getItem("sellers")) || [];

    const user = storedUsers.find(user => user.email === email);
    // console.log(user);
    const admin = storedAdmins.find(admin => admin.email === email);
    const seller = storedSellers.find(seller => seller.email === email);

    const hashedPassword = await User.hashPassword(password);

    if (user) {
      if(user.status === 'blocked' || user.status === 'banned' || user.status === 'inactive') {
        emailHelp.innerText = "Your account is blocked, banned, or inactive.";
        emailHelp.classList.add("text-danger");
        return;
      }
      const isPasswordCorrect = hashedPassword === user.passwordHash;
      // console.log(isPasswordCorrect);

      if (isPasswordCorrect) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginData', JSON.stringify({ userId: user.userId, loginFlag: true }));
        localStorage.setItem('userId', user.userId); // Store user ID
        window.location.href = 'index.html';
      } else {
        emailHelp.innerText = "Invalid email or password.";
        emailHelp.classList.add("text-danger");
      }
    } else if (admin) {
      const isPasswordCorrect = hashedPassword === admin.passwordHash;
      if (isPasswordCorrect) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminId', admin.adminId); // Store admin ID
        window.location.href = 'admin.html';
      } else {
        emailHelp.innerText = "Invalid email or password.";
        emailHelp.classList.add("text-danger");
      }
    } else if (seller) {
      if (seller.status === 'blocked' || seller.status === 'banned' || seller.status === 'inactive') {
        emailHelp.innerText = "Your account is blocked, banned, or inactive.";
        emailHelp.classList.add("text-danger");
        return;
      }
      const isPasswordCorrect = hashedPassword === seller.passwordHash;
      if (isPasswordCorrect) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('sellerId', seller.sellerId); // Store seller ID
        window.location.href = 'sellerDashboard.html';
      } else {
        emailHelp.innerText = "Invalid email or password.";
        emailHelp.classList.add("text-danger");
      }
    } else {
      emailHelp.innerText = "Invalid email or password.";
      emailHelp.classList.add("text-danger");
    }
  });
});