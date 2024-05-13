function verifyAPIKey() {
    fetch('/api/verifykey', { // Endpoint to verify the API key
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('API key verification successful.');
                document.getElementById('api-key-input').style.display = 'none'; // Hide input on success
            } else {
                alert("API Key is missing or invalid. Please contact support.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error verifying API key.");
        });
}



// // Global variable to store the API key
// let globalApiKey = '';

let testConnected = 0;

// // JavaScript function to store API key in a global variable.
// function storeAPIKey() {

//     // Get the value entered in the input field
//     var apiKey = document.getElementById('api-key-input').value;

//     // Store the API key in the global variable
//     globalApiKey = apiKey;

//     // You can now run a test check right after storing
//     testAPIKeyStorage(apiKey);

// }

// Function to capture form data and send it to the OpenAI API
function displayText() {
    // Get the text from the textarea
    var text = document.getElementById('input-text').value;

    // Clear the text area upon inputting the form data 
    document.getElementById('input-text').value = "";

    // Verify API Key before sending text to the OpenAI API
    verifyAPIKey().then(isValid => {
        if (isValid) {
            sendRequest(text);
        } else {
            alert("API Key is missing. Please store the API Key first.");
        }
    });
}





// Function to send request to the OpenAI API
function sendRequest(text) {
    // Request setup is the same minus the API key, which is handled server-side
    var requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Ensure you're using the correct model for your use case
            messages: [{ role: "user", content: text }]
        })
    };

    // Send the request to the OpenAI API
    fetch('https://api.openai.com/v1/chat/completions', requestData)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok. Re-enter correct API key.', response.status);
            }
            return response.json(); // This parses the JSON body of the response
        })
        .then(function (data) {
            // Assuming the structure of the response and extracting the content
            // Check if data.choices exists and has at least one entry
            if (data.choices && data.choices.length > 0 && data.choices[0].message) {
                // For /v1/chat/completions, the response structure is different; adjust accordingly
                var generatedText = data.choices[0].message.content; // Adjusted for chat completions endpoint

                // Find the display area in the DOM
                var displayArea = document.getElementById('display-area');

                // Set the text content of the display area to the generated text
                displayArea.textContent = generatedText; // Displaying the response directly

            } else {
                // Handle case where response does not contain expected data
                document.getElementById('display-area').textContent = "No response or unexpected response structure.";
            }
            console.log('API key successfuly connected.');
            testConnected = 1; //is connected. So remove API text dysplay.

            if (testConnected == 1) {

                // Hide the API key input field and submit button for security reasons
                document.getElementById('api-key-input').style.display = 'none';
                document.querySelector('button[onclick="storeAPIKey()"]').style.display = 'none';

            }
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('display-area').textContent = error.message;
        });


}

