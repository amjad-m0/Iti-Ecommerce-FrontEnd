
import { UsersDB } from './usersDB.js';

class User extends UsersDB {
  constructor(id, username, email, password, phone, city, district, address) {
      super(email, username, password, phone, city, district, address);
      this.id = id;
  }

  // Method to authenticate user
  async authenticate(password) {
      const hashedPassword = await UsersDB.hashPassword(password);
      return this.password === hashedPassword;
  }
  
  
  
    // Method to add product to shopping cart
    addToCart(product) {
      this.shoppingCart.push(product);
      this.updateCartTotal();
    }
  
    // Method to remove product from shopping cart
    removeFromCart(productId) {
      this.shoppingCart = this.shoppingCart.filter(product => product.productId !== productId);
      this.updateCartTotal();
    }
  
    // Method to add product to wishlist
    addToWishlist(product) {
      this.favourite.push(product);
    }
  
    // Method to remove product from wishlist
    removeFromWishlist(productId) {
      this.favourite = this.favourite.filter(product => product.productId !== productId);
    }
  
    // Method to update cart total
    updateCartTotal() {
      this.cartTotal = this.shoppingCart.reduce((total, product) => total + product.price, 0);
    }
  
    // Method to place an order
    placeOrder() {
      if (this.shoppingCart.length > 0) {
        const order = {
          orderId: new Date().getTime(), // Unique order ID
          items: [...this.shoppingCart],
          totalAmount: this.cartTotal,
          shippingAddress: this.shippingAddress,
          billingAddress: this.billingAddress,
          paymentMethod: this.paymentMethods[0], // Default payment method (you can choose based on user preference)
          date: new Date(),
        };
  
        this.orderHistory.push(order);
        this.shoppingCart = []; // Clear cart after placing order
        this.cartTotal = 0; // Reset cart total
      }
    }
  
    // Method to add a product review
    addReview(productId, rating, comment) {
      const review = {
        productId,
        rating,
        comment,
        date: new Date(),
      };
      this.productReviews.push(review);
      this.updateAverageRating();
    }
  
    // Method to calculate the average rating
    updateAverageRating() {
      if (this.productReviews.length > 0) {
        const totalRating = this.productReviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = totalRating / this.productReviews.length;
      }
    }
  
  
    // Method to log a user login event
    logLogin(ipAddress) {
      this.loginHistory.push({ timestamp: new Date(), ipAddress });
    }
  }
  export { User };
