const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const brandRoutes = require('./routes/brandRoutes');

// MongoDB connection string
const mongoDB = 'mongodb://localhost:27017/influencerDB';

// Connect to MongoDB
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize express app
const app = express();

// Use middlewares
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/brands', brandRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
