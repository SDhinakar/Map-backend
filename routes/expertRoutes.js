const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

// Create a new expert
router.post('/', expertController.createExpert);

// Update an existing expert by `sno`
router.put('/:sno', expertController.updateExpert);

// Retrieve all experts
router.get('/', expertController.getAllExperts);

// Delete an expert by `sno`
router.delete('/:sno', expertController.deleteExpert);

module.exports = router;
