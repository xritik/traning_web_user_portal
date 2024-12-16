const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// Email verification route
router.post('/', async (req, res) => {
    try {
        const { loginEmail } = req.body; // Get email from the request body

        // Check if the email exists in the database
        const admin = await Admin.findOne({ email: loginEmail });

        if (admin) {
            res.status(200).json({ message: 'Email exists', admin });
        } else {
            res.status(404).json({ message: 'Email not found' });
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;