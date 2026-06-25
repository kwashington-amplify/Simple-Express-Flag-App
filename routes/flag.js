const express = require('express');
const path = require('path');
const { getRandomQuote } = require('../quote');
const { getFlagState, toggleFlagState, getFlagHistory, deleteFlagHistory } = require('../flagState'); // Import flag state management functions
const router = express.Router(); // Create a router for flag-related routes

// Route to serve the main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));  
});


// API route to get the current flag state and a random quote
router.get('/data', async (req, res) => {
    getRandomQuote()
        .then(quote => {
            res.json({ feature_enabled: getFlagState(), quote});
        })
        .catch(error => {
            res.status(500).json({error: 'Failed to retrieve flag state.'});
        });
});

// API route to toggle the flag state with a reason
router.post('/toggle', (req, res) => {
    const { reason } = req.body;
    const newFlagState = toggleFlagState(reason);
    res.json({ feature_enabled: newFlagState });
});

// API route to get the history of flag changes
router.get('/history', (req, res) => {
    res.json({
        history: getFlagHistory()
    });
});

// API route to delete the flag history
router.delete('/history', (req, res) => {
    deleteFlagHistory();
    res.json({ message: 'Flag history deleted.' });
});

// Export the router to be used in app.js
module.exports = router;

