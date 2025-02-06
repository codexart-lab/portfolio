const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware to manage sessions
app.use(
    session({
        secret: "yourSecretKey", // Secret key for signing the session ID
        resave: false,
        saveUninitialized: true,
    })
);

// Middleware to serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Route: Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route: About Page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Route: Admin Panel
app.get("/admin", (req, res) => {
    if (req.session.loggedIn) {
        // If logged in, show the admin panel
        res.sendFile(path.join(__dirname, "public", "admin.html"));
    } else {
        // If not logged in, redirect to login
        res.redirect("/admin-login");
    }
});

// Route: Admin Login Page
app.get("/admin-login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin-login.html"));
});

// Route: Admin Login Handling (POST request)
app.post("/admin-login", (req, res) => {
    const { username, password } = req.body;

    // Replace these with your actual credentials
    const validUsername = "admin";
    const validPassword = "Tanjiro#7782";

    if (username === validUsername && password === validPassword) {
        req.session.loggedIn = true;
        res.redirect("/admin");
    } else {
        res.status(401).send("Invalid credentials.");
    }
});

// Route: Logout (Clear session)
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to logout.");
        }
        res.redirect("/");
    });
});

// 404 Middleware (Handles non-existing routes)
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n🎉 Hey baby, I'm alive 🥳`);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔑 Admin Panel: http://localhost:${PORT}/admin\n`);
});
