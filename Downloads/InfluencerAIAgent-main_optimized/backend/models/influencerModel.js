// Influencer Model
// This is the actual model for the influencer which will interact with the database
const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  followers: { type: Number, required: true },
  engagementRate: { type: Number, required: true },
  // Add other relevant fields as needed
});

module.exports = mongoose.model('Influencer', influencerSchema);