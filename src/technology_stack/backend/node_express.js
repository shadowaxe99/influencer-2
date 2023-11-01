// Importing necessary libraries and modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Initializing express
const app = express();

// Database Connection
mongoose.connect('mongodb://localhost:27017/influencerDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to handle JSON data
app.use(bodyParser.json());

// Middleware for splitting code into different files
app.use((req, res, next) => {
  fs.readdirSync(path.join(__dirname, 'database')).forEach(file => {
    require(`./database/${file.split('.')[0]}`)(app);
  });
  next();
});

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Influencer AI Agent System');
});

// Setting up the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Defining possible responses to different requests
app.all('*', (req, res) => {
  res.status(404).send('Resource not found. Please ensure you\'re accessing the correct route.');
});
