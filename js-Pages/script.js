 
 // JavaScript function to capture form data and display it on the page
  function displayText() {
    // Get the text from the textarea
    var text = document.getElementById('input-text').value;

    // Get the display area element
    var displayArea = document.getElementById('display-area');

    // Set the text content of the display area to the captured text
    displayArea.textContent = text;
  }