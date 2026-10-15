
// Email validation 
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Show error message
function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add("invalid");
    input.classList.remove("valid");
}

// Clear error message
function clearError(input, errorElement) {
    errorElement.textContent = "";
    input.classList.remove("invalid");
    input.classList.add("valid");
}

// Login Form Validation
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    const emailError = document.getElementById("loginEmailError");
    const passwordError = document.getElementById("loginPasswordError");
    const successMessage = document.getElementById("loginSuccess");

    let isValid = true;

    successMessage.textContent = "";

    // Email validation
    if (email.value.trim() === "") {
        showError(email, emailError, "Email is required.");
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, emailError, "Please enter a valid email address.");
        isValid = false;
    } else {
        clearError(email, emailError);
    }

    // Password validation
    if (password.value === "") {
        showError(password, passwordError, "Password is required.");
        isValid = false;
    } else if (password.value.length < 6) {
        showError(
            password,
            passwordError,
            "Password must be at least 6 characters long."
        );
        isValid = false;
    } else {
        clearError(password, passwordError);
    }

    // If all validations pass
    if (isValid) {
        successMessage.textContent =
            "Validation successful! Login form is ready.";

        loginForm.reset();

        email.classList.remove("valid");
        password.classList.remove("valid");
    }
});


// Registration Form Validation
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail");
    const password = document.getElementById("registerPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const emailError = document.getElementById("registerEmailError");
    const passwordError = document.getElementById("registerPasswordError");
    const confirmPasswordError =
        document.getElementById("confirmPasswordError");

    const successMessage = document.getElementById("registerSuccess");

    let isValid = true;

    successMessage.textContent = "";

    // Email validation
    if (email.value.trim() === "") {
        showError(email, emailError, "Email is required.");
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, emailError, "Please enter a valid email address.");
        isValid = false;
    } else {
        clearError(email, emailError);
    }

    // Password validation
    if (password.value === "") {
        showError(password, passwordError, "Password is required.");
        isValid = false;
    } else if (password.value.length < 6) {
        showError(
            password,
            passwordError,
            "Password must be at least 6 characters long."
        );
        isValid = false;
    } else {
        clearError(password, passwordError);
    }

    // Confirm password validation
    if (confirmPassword.value === "") {
        showError(
            confirmPassword,
            confirmPasswordError,
            "Please confirm your password."
        );
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        showError(
            confirmPassword,
            confirmPasswordError,
            "Passwords do not match."
        );
        isValid = false;
    } else {
        clearError(confirmPassword, confirmPasswordError);
    }

    // If all validations pass
    if (isValid) {
        successMessage.textContent =
            "Registration successful! All fields are valid.";

        registerForm.reset();

        email.classList.remove("valid");
        password.classList.remove("valid");
        confirmPassword.classList.remove("valid");
    }
});

