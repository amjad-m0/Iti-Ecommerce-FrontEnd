import { deleteItemById, getValueByKey, saveValueByKey } from './localstorage.js';
import { UsersDB } from './usersDB.js';

class Admin extends UsersDB {
  constructor(id, username, email, password, phone, city, district, address) {
    super(email, username, password, phone, city, district, address);
    this.id = id;
}
//   // Method to authenticate user
//   async authenticate(password) {
//     const hashedPassword = await UsersDB.hashPassword(password);
//     return this.password === hashedPassword;
// }

  static deleteCustomer(userId) {
    deleteItemById('users', userId);
  }

  static deleteProduct(productId) {
    deleteItemById('products', productId);
}

static deleteSeller(sellerId) {
  // Get all products
  const products = getValueByKey('products') || [];
  // console.log('All products:', products);
  // console.log('Seller ID to delete:', sellerId);

  // Get the seller's product listings
  const sellers = getValueByKey('sellers') || [];
  const seller = sellers.find(seller => seller.sellerId === sellerId);
  if (!seller) {
    // console.log('Seller not found');
    return;
  }
  const sellerProductIds = seller.productListings;
  // console.log('Seller product IDs:', sellerProductIds);

  // Log products for the seller
  const sellerProducts = products.filter(product => sellerProductIds.includes(product.productId));
  // console.log('Products for the seller:', sellerProducts);

  // / Filter out products that belong to the deleted seller
    const updatedProducts = products.filter(product => !sellerProductIds.includes(product.productId));
    // console.log('Updated products:', updatedProducts);

    // Save the updated products list
    saveValueByKey('products', updatedProducts);

    // Verify if the products are saved correctly
    const savedProducts = getValueByKey('products');
    // console.log('Saved products after deletion:', savedProducts);

    // Delete seller
    deleteItemById('sellers', sellerId);
    // console.log('Seller deleted:', sellerId);
  }

  static changeItemStatus(key, itemId, newStatus) {
    let items = getValueByKey(key) || [];
    items = items.map(item => {
      if (item.sellerId === itemId) {
        item.status = newStatus;
      }
      return item;
    });
    saveValueByKey(key, items);
  }

  static changeProductPrice(productId, newPrice) {
    const products = getValueByKey('products');
    const productIndex = products.findIndex(product => product.productId === productId);
    if (productIndex !== -1) {
      products[productIndex].price = newPrice;
      saveValueByKey('products', products);
    }
  }

  static addSeller(seller) {
    const sellers = getValueByKey('sellers') || [];
    sellers.push(seller);
    saveValueByKey('sellers', sellers);
  }

  static viewCustomers() {
    return getValueByKey('users') || [];
  }

  static viewSellers() {
    return getValueByKey('sellers') || [];
  }

  static viewProducts() {
    return getValueByKey('products') || [];
  }

  static viewItems(key) {
    return getValueByKey(key) || [];
  }
}

export { Admin };