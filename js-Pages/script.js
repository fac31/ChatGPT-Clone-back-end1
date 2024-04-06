// Declare apiKey variable outside of functions
var secureKey = '';

// JavaScript function to capture form data and display it on the page
function displayText() {
    // Get the text from the textarea
    var text = document.getElementById('input-text').value;

    // Get the display area element
    var displayArea = document.getElementById('display-area');

    // Set the text content of the display area to the captured text
    displayArea.textContent = text;

    // Send the captured text to the OpenAI API
    sendRequest(text);
}

// JavaScript function to store API key in a local variable
function storeAPIKey() {
    // Get the value entered in the input field
   var apiKey = document.getElementById('api-key-input').value;

    // Store the API key securely in a local variable
   secureKey = apiKey;

    // For demonstration purposes, you can log the stored API key to the console
    console.log("API Key stored:", secureKey);

    // You can now use the stored API key in your application
    // For production use, never store sensitive data like API keys in client-side code

    // Hide the API key input field and submit button
    document.getElementById('api-key-input').style.display = 'none';
    document.querySelector('button[onclick="storeAPIKey()"]').style.display = 'none';
}

// JavaScript function to send request to OpenAI API
function sendRequest(text) {
    // Get the API key stored in a local variable (replace 'your-api-key' with your actual API key)
  
// For demonstration purposes, you can log the stored API key to the console
console.log("API Key stored:", secureKey);

    // Construct the request data
    var requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + secureKey

            //put console log
        },
        body: JSON.stringify({
            prompt: text,
            max_tokens: 150
        })
    };


    // Send the request to OpenAI API
    fetch('https://api.openai.com/v1/chat/completions', requestData)
        .then(function(response) {
            // Check if response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse response as JSON
            return response.json();
        })
        .then(function(data) {
            // Display the response in the response area
            var displayArea = document.getElementById('display-area');
            displayArea.textContent = JSON.stringify(data, null, 2);
        })
        .catch(function(error) {
            // Handle any errors
            console.error('There was a problem with the fetch operation:', error);
        });
}
