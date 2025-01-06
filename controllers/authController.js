const User = require('../models/userModel');
const bcrypt = require('bcryptjs');



  exports.register = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      console.log('Request body:', req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);
      const newUser = new User({ name, email, password: hashedPassword });
      console.log('New user:', newUser);
    
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
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // For simplicity, we'll just send a success message and a user ID
    res.json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
