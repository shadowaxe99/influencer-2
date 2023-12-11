const mongoose = require('mongoose');

// Define MongoDB schemas
const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: String,
  // ... other user profile fields
});
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

const brandCollaborationSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  // ... other brand collaboration fields
});
const BrandCollaboration = mongoose.model('BrandCollaboration', brandCollaborationSchema);

const contentIdeaSchema = new mongoose.Schema({
  ideaTitle: { type: String, required: true },
  description: String,
  // ... other content idea fields
});
const ContentIdea = mongoose.model('ContentIdea', contentIdeaSchema);

// ... define other schemas

module.exports = {
  UserProfile,
  BrandCollaboration,
  ContentIdea,
  // ... export other models
};