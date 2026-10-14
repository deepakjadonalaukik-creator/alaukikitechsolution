// Get both views
const loginView = document.getElementById("login-view");
const registerView = document.getElementById("register-view");

// Get navigation links
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");

// Function to switch views
function showView(viewName) {
    const isLogin = viewName === "login";

    loginView.hidden = !isLogin;
    registerView.hidden = isLogin;
}

// Switch to registration view
showRegister.addEventListener("click", function (event) {
    event.preventDefault();
    showView("register");
});

// Switch to login view
showLogin.addEventListener("click", function (event) {
    event.preventDefault();
    showView("login");
});

// Demo form submission
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Login UI is working!");
});

document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Registration UI is working!");
});