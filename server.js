const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/location", locationRoutes); // Ensure correct route path

// Root Endpoint
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start the server
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "dev";

if (ENV === "dev") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app;