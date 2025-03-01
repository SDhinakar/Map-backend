const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Debugging: Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env");
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user ID to the frontend
    res.json({ message: 'Login successful', token, userId: user._id });
  } catch (err) {
    console.error('Error in login:', err.message); // Log the error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
};