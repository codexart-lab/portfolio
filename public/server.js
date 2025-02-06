const express = require("express");
const path = require("path");
const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

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

// Route: Admin Panel (Simple HTML Page)
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
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
