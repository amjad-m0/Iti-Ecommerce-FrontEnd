import { UsersDB } from './usersDB.js';
import { saveValueByKey, getValueByKey } from './localstorage.js';

// Declaring variables
const formElements = {
    email: document.getElementById("email"),
    emailHelp: document.getElementById("emailHelp"),
    username: document.getElementById("username"),
    userNameHelp: document.getElementById("userNameHelp"),
    password: document.getElementById("password"),
    passwordHelp: document.getElementById("passwordHelp"),
    passConfirm: document.getElementById("passconfirm"),
    confirmHelp: document.getElementById("confirmHelp"),
    phone: document.getElementById("phone"),
    phoneHelp: document.getElementById("phoneHelp"),
    city: document.getElementById("city"),
    district: document.getElementById("district"),
    address: document.getElementById("address"),
    addressHelp: document.getElementById("addressHelp"),
    submit: document.getElementById("submit"),
};

// General validation
const validateField = (field, regex, helpElement, successMessage, errorMessage, onValid = () => true) => {
    const value = field.value.trim();
    helpElement.textContent = '';  // Reset previous message
    helpElement.style.color = '';  // Reset previous color

    // Check if the field is empty
    if (!value) {
        helpElement.textContent = `${field.name} is required.`;
        helpElement.style.color = 'red';
        field.focus();
        return false;
    }

    // Check if the value matches the regex
    if (!regex.test(value)) {
        helpElement.textContent = errorMessage;
        helpElement.style.color = 'red';
        field.focus();
        return false;
    }

    // Get stored users from localStorage
    const users = getValueByKey("users") || [];

    // Check for username uniqueness
    if (field.id === 'username') {
        const usernameExists = users.some(user => user.name && user.name.toLowerCase() === value.toLowerCase());
        if (usernameExists) {
            helpElement.textContent = "Username is already registered.";
            helpElement.style.color = "red";
            field.focus();
            return false;
        }
    }

    // Check for email uniqueness
    if (field.id === 'email') {
        const emailExists = users.some(user => user.email && user.email.toLowerCase() === value.toLowerCase());
        if (emailExists) {
            helpElement.textContent = "Email is already registered.";
            helpElement.style.color = "red";
            field.focus();
            return false;
        }
    }

    // Check for phone number uniqueness
    if (field.id === 'phone') {
        const phoneExists = users.some(user => user.phone === value);
        if (phoneExists) {
            helpElement.textContent = "Phone number is already registered.";
            helpElement.style.color = "red";
            field.focus();
            return false;
        }
    }

    // If all checks pass, call the onValid callback
    onValid();
    helpElement.textContent = successMessage;
    helpElement.style.color = 'green';
    return true;
};

// Email validation with focus
const validateEmail = () => validateField(
    formElements.email,
    /^[A-Z0-9._+-]+@[A-Z0-9-]+\.[A-Z]{2,}$/i,
    formElements.emailHelp,
    "Email registered successfully.",
    "Enter a valid email.",
);

// Username validation with focus
const validateUsername = () => validateField(
    formElements.username,
    /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
    formElements.userNameHelp,
    "Username registered successfully.",
    "Username must be 8-30 characters, start with a letter, and contain only letters, digits, and '_'.",
);

// Password validation function
const validatePassword = () => {
    const passwordValue = formElements.password.value.trim();
    const passwordCriteria = {
        upperCase: /[A-Z]/.test(passwordValue),
        lowerCase: /[a-z]/.test(passwordValue),
        number: /\d/.test(passwordValue),
        specialChar: /[@$!%*?&]/.test(passwordValue),
        length: passwordValue.length >= 8 && passwordValue.length <= 10,
    };

    const circles = {
        upperCircle: passwordCriteria.upperCase,
        lowerCircle: passwordCriteria.lowerCase,
        numberCircle: passwordCriteria.number,
        specialCircle: passwordCriteria.specialChar,
        lengthCircle: passwordCriteria.length,
    };

    // Update badge colors dynamically
    Object.keys(circles).forEach((circleId) => {
        const circle = document.getElementById(circleId);
        if (circles[circleId]) {
            circle.classList.remove("bg-danger");
            circle.classList.add("bg-success");
        } else {
            circle.classList.remove("bg-success");
            circle.classList.add("bg-danger");
        }
    });

    // Update overall help text
    if (Object.values(passwordCriteria).every((criteria) => criteria)) {
        formElements.passwordHelp.textContent = "Password is valid.";
        formElements.passwordHelp.style.color = "green";
        return passwordValue;
    } else {
        formElements.passwordHelp.innerHTML = `Password must:<br>
        - Include uppercase, lowercase, digit, and special character<br>
        - Be between 8 and 10 characters long.`;
        formElements.passwordHelp.style.color = "red";
        return false;
    }
};

// Password confirmation validation with focus
const passwordConfirmation = () => {
    const passwordsMatch = formElements.password.value.trim() === formElements.passConfirm.value.trim();
    formElements.confirmHelp.textContent = passwordsMatch ? "Passwords match." : "Passwords do not match.";
    formElements.confirmHelp.style.color = passwordsMatch ? "green" : "red";
    return passwordsMatch;
};

// Phone validation with focus
const validatePhone = () => validateField(
    formElements.phone,
    /^01[0125][0-9]{8}$/,
    formElements.phoneHelp,
    "Phone number is valid.",
    "Phone number must start with 010, 011, 012, or 015 and be followed by 8 digits."
);

// City-dependent options with focus
const updatedistrictOptions = () => {
    const selectedCity = formElements.city.value;
    const options = selectedCity === 'Cairo' ? ['Downtown Cairo', 'Maadi', 'Zamalek', 'Helwan', 'Al Rehab'] :
        selectedCity === 'Alexandria' ? ['Smoha', 'Sidi Gaber', 'Sporting', 'Tosson'] : [];
    formElements.district.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
};

// Address validation with focus
const addressValidation = () => {
    const addressValue = formElements.address.value.trim();
    formElements.addressHelp.textContent = addressValue.length <= 10 ? 'A valid address is required.' : 'Address looks valid.';
    formElements.addressHelp.style.color = addressValue.length <= 10 ? 'red' : 'green';
    return addressValue.length > 10;
};

// Function to fetch address using latitude and longitude
const getAddress = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.display_name || "Unable to retrieve address.";
    } catch (error) {
        console.error("Error fetching geocoding data:", error.message);
        showNotification("Error fetching geocoding data. Check the console for details.");
    }
};

// Event listener for "Use My Location" button
document.getElementById('getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const fetchedAddress = await getAddress(latitude, longitude);
                if (fetchedAddress) {
                    document.getElementById('address').value = fetchedAddress;
                    formElements.addressHelp.textContent = 'Address fetched successfully.';
                    formElements.addressHelp.style.color = 'green';
                }
            },
            (error) => {
                showNotification("Error getting location: " + error.message);
            }
        );
    } else {
        showNotification("Geolocation is not supported by your browser.");
    }
});

// Create user
async function createUser() {
    if ([validateEmail(), validateUsername(), validatePassword(), passwordConfirmation(), validatePhone(), addressValidation()].every(Boolean)) {
        const user = new UsersDB(
            formElements.email.value,
            formElements.username.value,
            formElements.phone.value,
            formElements.city.value,
            formElements.district.value,
            formElements.address.value
        );
        user.passwordHash = await UsersDB.hashPassword(formElements.password.value); // Set the hashed password
        const users = getValueByKey("users") || [];
        users.push(user);
        saveValueByKey("users", users);
        showNotification("User successfully registered!");
        setTimeout(() => window.location.href = 'auth.html', 3000); // Redirect to login page
    } else {
        showNotification("Please fill in the form correctly.");
    }
}
// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    const eventListeners = [
        { element: 'email', event: 'blur', handler: validateEmail },
        { element: 'username', event: 'blur', handler: validateUsername },
        { element: 'password', event: 'input', handler: validatePassword },
        { element: 'passConfirm', event: 'blur', handler: passwordConfirmation },
        { element: 'phone', event: 'blur', handler: validatePhone },
        { element: 'city', event: 'blur', handler: updatedistrictOptions },
        { element: 'address', event: 'blur', handler: addressValidation },
    ];
    // Event listeners for validation
    eventListeners.forEach(({ element, event, handler }) => {
        if (formElements[element]) {
            formElements[element].addEventListener(event, handler);
        } else {
            console.warn(`Element with key '${element}' not found in formElements.`);
        }
    });
    // Form submission event listener
    document.getElementById("registerationform").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        createUser(); // Trigger the user creation process
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