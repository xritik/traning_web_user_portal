const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    trainingName: {
        type: String,
        required: true,
        trim: true,
    },
    technology: {
        type: String,
        required: true,
        trim: true,
    },
    vendor: {
        type: String,
        trim: true,
    },
    companyName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    contact: {
        type: String,
        trim: true,
    },
    startDate: {
        type: String, // Changed to Date type
        required: true,
    },
    endDate: {
        type: String, // Changed to Date type
        required: true,
    },
    remarks: {
        type: String,
        trim: true,
        default: '',
    },
    labUsed: {
        type: String,
        trim: true,
        default: 'Not specified',
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
