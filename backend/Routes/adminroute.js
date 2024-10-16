const express = require('express');
const router = express.Router();
const admin = require('../Models/admin'); // Assuming you have an admin model

router.post('/LoginAdmin', async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    try {
        // Find the admin by email
        const foundAdmin = await admin.findOne({ email });

        if (!foundAdmin) {
            return res.status(400).json({ success: false, message: 'Invalid email. Please try again.' });
        }

        // Check if the provided password matches the stored password
        if (password !== foundAdmin.password) { // Directly comparing the plain text password
            return res.status(400).json({ success: false, message: 'Invalid password. Please try again.' });
        }

        // If credentials are valid, send a success response
        res.json({ success: true, message: 'Login successful!', email: foundAdmin.email });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
