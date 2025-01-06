const express = require('express');
const router = express.Router();
const Training = require('../models/trainings');

router.get('/:searchedText', async (req, res) => {
    const { searchedText } = req.params;

    try {
        const query = {
            $or: [
                { trainingName: { $regex: searchedText, $options: 'i' } },
                { technology: { $regex: searchedText, $options: 'i' } },
                { vendor: { $regex: searchedText, $options: 'i' } },
                { companyName: { $regex: searchedText, $options: 'i' } },
                { trainerName: { $regex: searchedText, $options: 'i' } },
                { email: { $regex: searchedText, $options: 'i' } },
                { contact: { $regex: searchedText, $options: 'i' } },
            ],
        };

        const trainings = await Training.find(query);

        if (trainings.length > 0) {
            res.status(200).json({ results: trainings });
        } else {
            res.status(404).json({ message: 'No matched trainings found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving messages' });
    }
});

module.exports = router;