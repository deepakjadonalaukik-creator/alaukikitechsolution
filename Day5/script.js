

const currentDate = document.getElementById("currentDate");

const today = new Date();

currentDate.textContent = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
});


// ===== Mobile Sidebar Toggle =====

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("open");
});


// ===== Sidebar Navigation =====

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

        // Close sidebar on mobile after navigation
        sidebar.classList.remove("open");
    });
});


// ===== Logout Button =====

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        alert("This is a static dashboard demo. No user session exists.");
    }
});


// ===== View All Button =====

const viewAllBtn = document.getElementById("viewAllBtn");

viewAllBtn.addEventListener("click", function () {
    document.getElementById("tasks").scrollIntoView({
        behavior: "smooth"
    });
});

