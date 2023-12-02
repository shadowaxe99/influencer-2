const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Define Mongoose schemas based on the provided data schemas
const UserProfileSchema = new mongoose.Schema({
  name: String,
  age: Number,
  occupation: String,
  // ... other fields as per shared_dependencies
});
const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

const BrandCollaborationSchema = new mongoose.Schema({
  brand: String,
  deal: String,
  // ... other fields as per shared_dependencies
});
const BrandCollaboration = mongoose.model('BrandCollaboration', BrandCollaborationSchema);

// ... define other schemas and models

// Export the models
module.exports = {
  UserProfile,
  BrandCollaboration,
  // ... export other models
};

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/influencerDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Welcome to the Influencer AI Agent System');
});

// Example CRUD operations for UserProfile
app.get('/api/profile', (req, res) => {
  UserProfile.find()
    .then(profile => res.json(profile))
    .catch(err => res.status(500).json({ error: err.message }));
});

// ... POST, PUT, DELETE operations for UserProfile

// CRUD operations for BrandCollaboration
app.get('/api/collaborations', (req, res) => {
  BrandCollaboration.find()
    .then(collaborations => res.json(collaborations))
    .catch(err => res.status(500).json({ error: err.message }));
});

// ... POST, PUT, DELETE operations for BrandCollaboration

// ... CRUD operations for other models

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));