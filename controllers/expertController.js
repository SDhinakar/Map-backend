const Expert = require('../models/expertModel');

// POST - Create a new expert
exports.createExpert = async (req, res) => {
  try {
    const newExpert = new Expert(req.body);
    const savedExpert = await newExpert.save();
    res.status(201).json(savedExpert);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create expert', error });
  }
};

// PUT - Update an existing expert
exports.updateExpert = async (req, res) => {
  try {
    const updatedExpert = await Expert.findOneAndUpdate(
      { sno: req.params.sno },
      req.body,
      { new: true }
    );
    if (!updatedExpert) {
      return res.status(404).json({ message: 'Expert not found' });
    }
    res.status(200).json(updatedExpert);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update expert', error });
  }
};

// GET - Retrieve all experts
exports.getAllExperts = async (req, res) => {
  try {
    const experts = await Expert.find();
    res.status(200).json(experts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve experts', error });
  }
};

// DELETE - Delete an expert
exports.deleteExpert = async (req, res) => {
  try {
    const deletedExpert = await Expert.findOneAndDelete({ sno: req.params.sno });
    if (!deletedExpert) {
      return res.status(404).json({ message: 'Expert not found' });
    }
    res.status(200).json({ message: 'Expert deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expert', error });
  }
};
