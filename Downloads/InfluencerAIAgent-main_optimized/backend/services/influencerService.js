const Influencer = require('../models/Influencer');

const findAllInfluencers = async () => {
  return await Influencer.find({});
};

const createInfluencer = async (influencerData) => {
  const influencer = new Influencer(influencerData);
  return await influencer.save();
};

const updateInfluencer = async (id, influencerData) => {
  return await Influencer.findByIdAndUpdate(id, influencerData, { new: true });
};

const deleteInfluencer = async (id) => {
  return await Influencer.findByIdAndRemove(id);
};

module.exports = {
  findAllInfluencers,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer
};