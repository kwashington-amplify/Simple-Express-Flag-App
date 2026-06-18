let flagEnabled = process.env.FLAG_ENABLED === 'true'; // Default to true if not set
let flagHistory = []; // Array to store the history of flag changes

// Function to get the current state of the flag
function getFlagState() {
    return flagEnabled;
}

// Function to toggle the state of the flag and record the reason and timestamp
function toggleFlagState(reason) {
    // Toggle the flag state
    flagEnabled = !flagEnabled;

    // Record the change in history with reason and timestamp
    flagHistory.push({
        status: flagEnabled,
        reason: reason,
        timestamp: new Date().toLocaleString()
    });

    // Keep only the last 10 entries in history
    if(flagHistory.length > 10) {
        flagHistory.shift();
    }

    return flagEnabled;
}

// Function to get the history of flag changes
function getFlagHistory() {
    return flagHistory;
}

// Function to delete the flag history
function deleteFlagHistory() {
    flagHistory = [];
}

// Export the functions for use in other modules
module.exports = {
    getFlagState,
    toggleFlagState,
    getFlagHistory,
    deleteFlagHistory
};  