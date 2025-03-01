// routes/locationRoutes.js
const express = require("express");
const { addLocation, getUserLocations, deleteAllLocations } = require("../controllers/locationController");

const router = express.Router();

router.post("/add", addLocation);
router.get("/", getUserLocations);
router.delete("/clear", deleteAllLocations);

module.exports = router;
