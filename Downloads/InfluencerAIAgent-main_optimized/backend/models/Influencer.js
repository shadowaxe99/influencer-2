const mongoose = require('mongoose')
const influencerSchema = new mongoose.Schema({
name: {
type: String,
required: true
},
username: {
type: String,
required: true,
unique: true
},
email: {
type: String,
required: true,
unique: true
},
bio: String,
followers: {
type: Number,
default: 0
},
following: {
type: Number,
default: 0
},
posts: {
type: Number,
default: 0
},
profilePicture: String,
socialMediaLinks: [String]
}, {
timestamps: true
})
module.exports = mongoose.model('Influencer', influencerSchema)