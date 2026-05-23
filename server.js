const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 1. Import the User model so we can create the default admin
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 2. Function to auto-create an admin if one doesn't exist
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const defaultAdmin = new User({
        name: 'System Admin',
        phone: '1234567890',
        password: 'admin@simakhi',
        role: 'admin'
      });
      await defaultAdmin.save();
      console.log('✅ Default admin account created automatically!');
      console.log('   Phone: 1234567890 | Password: admin@simakhi');
    }
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz_app');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // 3. Run the admin check immediately after the database connects
    await createDefaultAdmin();

  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Stop the server if the database won't connect
  }
};

// Execute the connection
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/user', require('./routes/user'));

// Serve HTML pages
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`➜ Local: http://localhost:${PORT}`);
});