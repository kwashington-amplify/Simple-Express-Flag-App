const { SSMClient, GetParameterCommand, PutParameterCommand} = require('@aws-sdk/client-ssm');
const { STSClient, GetCallerIdentityCommand } = require('@aws-sdk/client-sts');
let flagHistory = []; // Array to store the history of flag changes

const FLAG_NAME = "/secret/devci/databags/enrollment/maint_test_flag";

function getClient() {
    return new SSMClient({
        region: "us-east-1"
    });
}
    

// Function to get the current state of the flag
async function getFlagState() {
    const client = getClient();
    const getCommand = new GetParameterCommand({ Name: FLAG_NAME});
    const response = await client.send(getCommand);
    return response.Parameter.Value === "true";
}

// Function to toggle the state of the flag and record the reason and timestamp
async function toggleFlagState(reason) {
    const currentState =  await getFlagState()

    const newState = !currentState;

    const putCommand = new PutParameterCommand({
        Name: FLAG_NAME,
        Value: String(newState),
        Overwrite: true,
    });

    await client.send(putCommand);

    // Record the change in history with reason and timestamp
    flagHistory.push({
        status: newState,
        reason: reason,
        timestamp: new Date().toLocaleString()
    });

    // Keep only the last 10 entries in history
    if(flagHistory.length > 10) {
        flagHistory.shift();
    }

    return newState;
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