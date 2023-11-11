const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Import models
const { UserProfile, BrandCollaboration, ContentIdea, PressRelease, LegalAdvice, Contact, Appointment, StrategyInsight, PostPerformance } = require('./database/mongodb');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.get('/api/profile', (req, res) => {
  // Handle profile retrieval
  UserProfile.find()
    .then(profile => res.json(profile))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/api/collaborations', (req, res) => {
  // Handle collaborations retrieval
  BrandCollaboration.find()
    .then(collaborations => res.json(collaborations))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/api/content-ideas', (req, res) => {
  // Handle content ideas retrieval
  ContentIdea.find()
    .then(ideas => res.json(ideas))
    .catch(err => res.status(500).json({ error: err.message }));
});

// ... define other routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
