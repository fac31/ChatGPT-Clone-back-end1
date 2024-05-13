// Global variable to indicate if the API key is connected
let testConnected = 0;

// Function to handle response from fetch call
function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok', response.status);
    }
    return response.json();
}

// Function to process API response data
function processData(data) {
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        var generatedText = data.choices[0].message.content;
        var displayArea = document.getElementById('display-area');
        displayArea.textContent = generatedText; // Displaying the response directly
    } else {
        document.getElementById('display-area').textContent = "No response or unexpected response structure.";
    }
    console.log('API key successfully connected.');
    testConnected = 1; // Mark as connected.
}

// Function to handle errors during fetch operation
function handleError(error) {
    console.error('There was a problem with the fetch operation:', error);
    document.getElementById('display-area').textContent = error.message;
}

// Function to verify the API key with the server
function verifyAPIKey() {
    fetch('/api/verifykey', { // Assumes an endpoint that checks if the API key is valid
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('API key verification successful.');
                testConnected = 1; // Mark as connected
            } else {
                alert("API Key is missing or invalid. Please contact support.");
            }
        })
        .catch(error => {
            console.error('Error verifying API key:', error);
            alert("Error verifying API key.");
        });
}

// Function to capture form data and send it to the server for API interaction
function displayText() {
    var text = document.getElementById('input-text').value;
    document.getElementById('input-text').value = ""; // Clear the text area upon inputting the form data

    if (testConnected) {
        sendRequest(text);
    } else {
        alert("API Key is missing. Please verify the API Key first.");
    }
}

// Function to send request to the OpenAI API via server
function sendRequest(text) {
    var requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: text }]
        })
    };

    fetch('https://api.openai.com/v1/chat/completions', requestData)
        .then(handleResponse)
        .then(processData)
        .catch(handleError);
}
