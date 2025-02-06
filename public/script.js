// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Logout Button (Placeholder functionality)
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    alert("You have logged out (this is a placeholder for real authentication).");
    // Redirect to home page or login page
    window.location.href = "/";
});
