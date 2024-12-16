const express = require('express');
const router = express.Router();
const Training = require('../models/trainings');

router.get('/all', async (req, res) => {
    try {
        const trainings = await Training.find();
        if(trainings.length > 0){
            res.status(201).json( trainings );
        }else {
            res.status(404).json({ message: 'There is no such training!!' });
        }
    } catch (error) {
        console.error("Error fetching trainings:", error);
        res.status(500).json({ message: 'An error occurred while fetching all trainings' });
    }
})



router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const training = await Training.findById(id);
        if (training) {
            res.status(201).json( training );
        } else {
            res.status(404).json({ message: 'There is no such training!!' });
        }
    } catch (error) {
        console.error("Error fetching training:", error);
        res.status(500).json({ message: 'An error occurred while fetching a training' });
    }
});



router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const trainingData = req.body; // Updated fields

    try {
        // Find and update the training
        const updatedTraining = await Training.findByIdAndUpdate(id, trainingData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        if (updatedTraining) {
            res.status(200).json({ message: 'Training updated successfully', training: updatedTraining });
        } else {
            res.status(404).json({ message: 'Training not found' });
        }
    } catch (error) {
        console.error("Error updating training:", error);
        res.status(500).json({ message: 'An error occurred while updating the training' });
    }
});

module.exports = router;