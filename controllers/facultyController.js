// backend/controllers/facultyController.js
const Faculty = require('../models/facultyModel');

// Create a new faculty
exports.addFaculty = async (req, res) => {
    try {
        const faculty = new Faculty(req.body);
        await faculty.save();
        res.status(201).json(faculty);
    } catch (error) {
        console.error('Error saving faculty:', error);
        res.status(400).json({ message: 'Failed to add faculty', error });
    }
};

// Get all faculties
exports.getAllFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faculties', error: error.message });
    }
};

// Get a single faculty by ID
exports.getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faculty', error: error.message });
    }
};

// Update a faculty by ID
exports.updateFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        res.status(200).json({ message: 'Faculty updated successfully', faculty });
    } catch (error) {
        res.status(400).json({ message: 'Error updating faculty', error: error.message });
    }
};

// Delete a faculty by ID
exports.deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        res.status(200).json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting faculty', error: error.message });
    }
};
