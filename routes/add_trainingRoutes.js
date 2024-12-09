const express = require('express');
const router = express.Router();
const Training = require('../models/trainings');

router.post('/', async (req, res) => {
    const { trainingName, technology, vendor, companyName, email, contact, startDate, endDate, remarks, labUsed } = req.body;

    try {
        const newTraining = new Training({ trainingName, technology, vendor, companyName, email, contact, startDate, endDate, remarks, labUsed });
        await newTraining.save();
        res.status(201).json({ message: `"${trainingName}" added successfully` });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'An error occurred while adding a new training' });
    }
});

module.exports = router;