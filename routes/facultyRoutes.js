// backend/routes/facultyRoutes.js
const express = require('express');
const {
    addFaculty,
    getAllFaculties,
    getFacultyById,
    updateFaculty,
    deleteFaculty
} = require('../controllers/facultyController');

const router = express.Router();

// Create a new faculty
router.post('/', addFaculty);

// Get all faculties
router.get('/', getAllFaculties);

// Get a single faculty by ID
router.get('/:id', getFacultyById);

// Update a faculty by ID
router.put('/:id', updateFaculty);

// Delete a faculty by ID
router.delete('/:id', deleteFaculty);

module.exports = router;
