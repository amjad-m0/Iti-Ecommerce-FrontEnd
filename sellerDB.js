import { UsersDB } from './usersDB.js';
import { Admin } from './adminDB.js';

class Seller extends UsersDB {
  constructor(email, username, phone, city, district, address, businessName, status) {
    // Call the parent class (UsersDB) constructor first
    super(email, username, phone, city, district, address, status);
    
    // Initialize seller-specific properties
    this.businessName = businessName;
    this.productListings = [];
    this.inventoryCount = {};
    this.discountOffers = [];
    this.rating = 0;
    this.reviewsCount = 0;
    this.orderHistory = [];
    this.salesVolume = 0;
    this.earnings = 0;
  }

  static generateId() {
    return '_' + Math.random().toString(36).slice(2, 9); // Random alphanumeric string
  }

  addProduct(product) {
    this.productListings.push(product.productId); // Store product IDs
  }

  updateInventory(productId, count) {
    this.inventoryCount[productId] = count;
  }

  deleteProduct(productId) {
    this.productListings = this.productListings.filter(id => id !== productId);
  }

  viewProducts() {
    const allProducts = Admin.viewProducts();
    return allProducts.filter(product => this.productListings.includes(product.productId));
  }

  modifyProductPrice(productId, newPrice) {
    Admin.changeProductPrice(productId, newPrice);
  }
}

export { Seller };