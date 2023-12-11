const express = require('express')
const router = express.Router()
const influencerController = require('./controllers/influencerController')
// Influencer routes
router.get('/influencers', influencerController.getInfluencers)
router.post('/influencers', influencerController.createInfluencer)
router.put('/influencers/:id', influencerController.updateInfluencer)
router.delete('/influencers/:id', influencerController.deleteInfluencer)
module.exports = router