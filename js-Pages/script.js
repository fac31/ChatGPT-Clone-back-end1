// Global variable to store the API key
let globalApiKey = '';

// JavaScript function to store API key in a global variable
function storeAPIKey() {
    // Get the value entered in the input field
    var apiKey = document.getElementById('api-key-input').value;

    // Store the API key in the global variable
    globalApiKey = apiKey;

    // Optionally, log to the console for verification (remove in production)
    console.log("API Key stored successfully");

    // Hide the API key input field and submit button for security reasons
    document.getElementById('api-key-input').style.display = 'none';
    document.querySelector('button[onclick="storeAPIKey()"]').style.display = 'none';
}

// Function to capture form data and send it to the OpenAI API
function displayText() {
    // Get the text from the textarea
    var text = document.getElementById('input-text').value;

    // Check if API Key is stored
    if (!globalApiKey) {
        alert("API Key is missing. Please store the API Key first.");
        return;
    }

    // Send the captured text to the OpenAI API
    sendRequest(text);
}

// Function to send request to the OpenAI API
function sendRequest(text) {
    // Use the globally stored API key
    var apiKey = globalApiKey;

    // Construct the request data
    var requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Ensure you're using the correct model for your use case
            messages: [{role: "user", content: text}]
        })
    };

    // Send the request to the OpenAI API
    fetch('https://api.openai.com/v1/chat/completions', requestData)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok. Status:', response.status);
            }
            return response.json();
        })
        .then(function(data) {
            // Display the API response
            var displayArea = document.getElementById('display-area');
            // Assuming you want to display the text of the first completion
            if (data.choices && data.choices.length > 0) {
                displayArea.textContent = data.choices[0].message.content;
            } else {
                displayArea.textContent = "No response from API.";
            }
        })
        .catch(function(error) {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('display-area').textContent = error.message;
        });
}