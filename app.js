require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const flagRouter = require('./routes/flag');

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
    next();
});

// Set the port
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/flag", flagRouter); // Use the flag router for API routes
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});