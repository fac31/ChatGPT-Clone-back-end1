/*------------------------------------*\
  #TEST: Check if page loads properly
\*------------------------------------*/

function testDOMElementsExist() {
    // Check if the API key input exists
    const apiKeyInputExists = document.getElementById('api-key-input') !== null;
    console.log('Test API Key Input Exists: ' + (apiKeyInputExists ? 'PASS' : 'FAIL'));

    // Check if the submit button exists
    const submitButtonExists = document.querySelector('button[onclick="storeAPIKey()"]') !== null;
    console.log('Test Submit Button Exists: ' + (submitButtonExists ? 'PASS' : 'FAIL'));

    // Check if the text area exists
    const textAreaExists = document.getElementById('input-text') !== null;
    console.log('Test Text Area Exists: ' + (textAreaExists ? 'PASS' : 'FAIL'));

    // Check if the display area exists
    const displayAreaExists = document.getElementById('display-area') !== null;
    console.log('Test Display Area Exists: ' + (displayAreaExists ? 'PASS' : 'FAIL'));
}

window.onload = testDOMElementsExist;


/*----------------------------------------*\
  #TEST: Check API key is stored correctly
\*----------------------------------------*/

// function testStoreAPIKeyFunction(apiKey) {
//     // Clear any existing value
//     document.getElementById('api-key-input').value = '';

//     // Set the test API key
//     document.getElementById('api-key-input').value = apiKey;

//     // Call the function to test
//     storeAPIKey();

//     // Checks
//     console.log('Test API Key Stored: ' + (globalApiKey === apiKey ? 'PASS' : 'FAIL'));
//     console.log('Test Input Cleared: ' + (document.getElementById('api-key-input').value === '' ? 'PASS' : 'FAIL'));
// }


/*-----------------------------------------------------------------------*\
  #TEST: Interaction with Open AI API by testing the displayText function
\*-----------------------------------------------------------------------*/

/*Objectives:

    1. The displayText function correctly handles the absence of an API key, showing an appropriate message to the user.
    2. When the API key is present, the function successfully sends data to the AP

/**
* 1. Testing Response to Missing API Key
 */

// function testDisplayTextWithNoAPIKey() {
//     // Ensure the API key is not set
//     globalApiKey = '';

//     // Capture the alert message
//     const originalAlert = window.alert; // backup original alert function
//     let alertMessage = null;
//     window.alert = (msg) => { alertMessage = msg; }; // mock alert function

//     // Call the function
//     displayText();

//     // Check if the correct alert message is shown
//     console.log('Test Display Text without API Key: ' + (alertMessage === "API Key is missing. Please store the API Key first." ? 'PASS' : 'FAIL'));

//     // Restore the original alert function
//     window.alert = originalAlert;
// }

/**
* 2. Testing Successful API Call
 */
/*
function testDisplayTextWithAPIKey() {
    // Setup: Set a test API key and simulate user input
    globalApiKey = 'test-key';
    document.getElementById('input-text').value = "Hello, world!";

    // Mock the fetch function to simulate API call
    const originalFetch = window.fetch;
    let fetchCalled = false;
    window.fetch = (url, options) => {
        fetchCalled = true;
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ choices: [{ message: { content: "Hello, test response!" }}] }) });
    };

    // Call the function
    displayText();

    // Check if fetch was called
    console.log('Test Display Text with API Key: ' + (fetchCalled ? 'PASS' : 'FAIL'));

    // Restore original functions
    window.fetch = originalFetch;
    document.getElementById('input-text').value = "";
}
*?
/*----------------------------------------*\
  #TEST: Successful API Response
\*----------------------------------------*/

// function testSuccessfulAPIResponse() {
//     // Mock global API key setup
//     globalApiKey = 'valid-api-key';

//     // Mock fetch to simulate a successful API response
//     const originalFetch = window.fetch;
//     window.fetch = () => Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({
//             choices: [{ message: { content: "Hello, this is a simulated response from GPT-3.5!" } }]
//         })
//     });

//     // Call the function that makes the API request
//     document.getElementById('input-text').value = "Test input for API";
//     displayText(); // displayText() is the function that handles the submission and API interaction

//     // Assertion (Check if the display area is updated correctly)
//     setTimeout(() => { // Use setTimeout to allow fetch mock to process
//         const displayContent = document.getElementById('display-area').textContent;
//         console.log('Test Successful API Response: ' + (displayContent.includes("Hello, this is a simulated response from GPT-3.5!") ? 'PASS' : 'FAIL'));

//         // Restore the original fetch function
//         window.fetch = originalFetch;
//     }, 100);
// }

/*----------------------------------------*\
  #RUNNING TESTS ON WINDOW ONLOAD
\*----------------------------------------*/

// window.addEventListener('load', function() {
//     // Run the test for DOM element existence
//     testDOMElementsExist();

//     // Test API key storage and input field clearance
//     testStoreAPIKeyFunction();

//     // Test the displayText function's behavior in both scenarios
//    // testDisplayTextWithNoAPIKey();
//    // testDisplayTextWithAPIKey();

//     // Test successful API response
//    // testSuccessfulAPIResponse();
// });


