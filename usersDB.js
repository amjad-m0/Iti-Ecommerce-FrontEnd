class UsersDB {
    constructor(email, username, phone, city, district, address, status) {
      this.userId = UsersDB.generateId(); // Generate a random ID
      this.name = username;
      this.email = email;
      this.phone = phone;
      this.city = city;
      this.district = district;
      this.address = address;
      this.isLoggedIng = false;
      this.status = status || 'active'; // Ensure status is set, default to 'active'
      this.passwordHash = null; // Initialize passwordHash as null
    }
  
    // Static method to generate a random ID
    static generateId() {
      return '_' + Math.random().toString(36).slice(2, 9); // Random alphanumeric string
    }
  
    // Method to authenticate user
    async authenticate(password) {
      const hashedPassword = await UsersDB.hashPassword(password);
      return this.passwordHash === hashedPassword;
    }
  
    // Static method to hash password (returns a promise)
    static async hashPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
  
      try {
        const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Returns a promise with the hash
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join(""); // Convert each byte to hex
        return hashHex;
      } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
      }
    }
  }
  
  export { UsersDB };