require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Route to store and verify the API key
app.post('/api/storekey', (req, res) => {
    const submittedApiKey = req.body.apiKey;
    const storedApiKey = process.env.API_KEY; // Securely stored API key in environment

    if (submittedApiKey === storedApiKey) {
        res.json({ success: true, message: "API Key is valid" });
    } else {
        res.status(401).json({ success: false, message: "Invalid API Key" });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));