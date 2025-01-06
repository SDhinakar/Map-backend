const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    sno: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    alumniStatus: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    coordinatorName: {
        type: String,
        required: true
    },
    coordinatorPhone: {
        type: String,
        required: true
    },
    coordinatorEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
});

// Create the Expert model
const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;
