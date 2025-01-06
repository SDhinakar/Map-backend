const mongoose = require('mongoose'); // Import mongoose

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt fields

const User = mongoose.model('User', UserSchema);

module.exports = User;
