const Location = require("../models/locationModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Add a new location
const addLocation = async (req, res) => {
  try {
    const { name, x, y, type } = req.body;

    // Validate required fields
    if (!name || x == null || y == null || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate x and y coordinates
    if (typeof x !== "number" || typeof y !== "number" || x < 0 || x > 800 || y < 0 || y > 600) {
      return res.status(400).json({ message: "Invalid coordinates. x must be between 0 and 800, and y must be between 0 and 600." });
    }

    // Validate location type
    const validTypes = ["building", "library", "cafeteria", "gym", "hostel"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid location type. Allowed types are: building, library, cafeteria, gym, hostel." });
    }

    // Extract userId from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.userId;

    // Check if the location name already exists for the user
    const existingLocation = await Location.findOne({ userId, name });
    if (existingLocation) {
      return res.status(400).json({ message: "Location with this name already exists" });
    }

    // Create and save the new location
    const newLocation = new Location({ userId, name, x, y, type });
    await newLocation.save();

    res.status(201).json({ message: "Location added successfully", location: newLocation });
  } catch (error) {
    console.error("Error in addLocation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all locations for the user
const getUserLocations = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Fetch locations for the user
    const locations = await Location.find({ userId }).lean(); // Use .lean() for plain JavaScript objects

    // Transform _id to id
    const transformedLocations = locations.map(loc => ({
      ...loc,
      id: loc._id.toString(), // Convert _id to id
    }));

    console.log("Fetched Locations:", transformedLocations);
    res.status(200).json({ locations: transformedLocations });
  } catch (error) {
    console.error("Error in getUserLocations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete all locations for a user
const deleteAllLocations = async (req, res) => {
  try {
    // Extract userId from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.userId;

    // Delete all locations for the user
    const result = await Location.deleteMany({ userId });
    console.log("Deleted locations count:", result.deletedCount);

    res.status(200).json({ message: "All locations deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAllLocations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addLocation, getUserLocations, deleteAllLocations };