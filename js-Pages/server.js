// Import necessary modules
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize express app
const app = express();
app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON bodies

// Route to verify the API key
app.get('/api/verifykey', (req, res) => {
    console.log('Received request for API key verification');
    if (process.env.API_KEY && process.env.API_KEY.trim() !== '') {
        console.log('API Key is set');
        res.json({ success: true });
    } else {
        console.log('API Key is missing');
        res.json({ success: false });
    }
});

// Route to send requests to the OpenAI API
app.post('/api/send', async (req, res) => {
    // Include API key in requests to OpenAI or other services
    const apiKey = process.env.API_KEY;
    const requestData = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    };

    // Send the request to the OpenAI API
    try {
        const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', requestData);
        const apiData = await apiResponse.json();
        res.json(apiData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from OpenAI API: ' + err.message });
    }
});

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});