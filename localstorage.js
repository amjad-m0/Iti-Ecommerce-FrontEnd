// Purpose: Functions to read and write data to localStorage

// Add products, categories, and subcategories from data.json to localStorage
const fetchAndStoreData = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();


        // Only store products if they do not already exist in localStorage
        if (!localStorage.getItem('products') ||
            !localStorage.getItem('categories') ||
            !localStorage.getItem('subcategories') ||
            !localStorage.getItem('admins') ||
            !localStorage.getItem('sellers') ||
            !localStorage.getItem('users'))
        {
            localStorage.setItem('categories', JSON.stringify(data.categories));
            localStorage.setItem('subcategories', JSON.stringify(data.subcategories));
            localStorage.setItem('products', JSON.stringify(data.products));
            localStorage.setItem('admins', JSON.stringify(data.admins));
            localStorage.setItem('sellers', JSON.stringify(data.sellers));
            localStorage.setItem('users', JSON.stringify(data.users));
        }

        console.log('Data fetched and stored successfully');
    } catch (error) {
        console.error('Error fetching and storing data:', error);
    }
};
// Call the function to fetch and store data
fetchAndStoreData();


// Get key from localStorage
const getValueByKey = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || null;
    } catch (error) {
        console.error(`Error reading from localStorage for key "${key}":`, error);
        return null;
    }
};

// Create or Update value in localStorage
const saveValueByKey = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error saving in localStorage for key "${key}":`, error);
    }
};

// Delete value from localStorage
const deleteValueByKey = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error deleting from localStorage for key "${key}":`, error);
    }
};

// Delete item by ID from localStorage
const deleteItemById = (key, id) => {
    try {
        let items = JSON.parse(localStorage.getItem(key)) || [];
        
        items = items.filter(item => {
            if (key === 'users') return item.userId !== id;
            if (key === 'sellers') return item.sellerId !== id;
            if (key === 'products'){ 
                let users = getValueByKey("users");
                users.forEach(user => {
                    user.shoppingCart.forEach(product=>{
                    if(product.productId==id)
                        user.shoppingCart =user.shoppingCart.filter(product=>product.productId!=id);
                        user.favourite =user.favourite.filter(product=>product.productId!=id);

                    })
                
                localStorage.setItem('users',JSON.stringify(users))})

                return item.productId !== id;}
                
                }
            );
            localStorage.setItem(key, JSON.stringify(items));
            return true;
        }
        
     catch (error) {
        console.error(`Error deleting item with id "${id}" from localStorage for key "${key}":`, error);
    }
};


// Export functions to make them accessible in other modules
export { saveValueByKey, getValueByKey, deleteValueByKey, deleteItemById,fetchAndStoreData };