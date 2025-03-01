const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  type: { type: String, enum: ["building", "library", "cafeteria", "gym", "hostel"], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Location", locationSchema);
