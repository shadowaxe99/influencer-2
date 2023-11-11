const express = require('express');
const router = express.Router();
const { getUserProfile, createUserProfile, updateUserProfile } = require('../controllers/userController');

// Routes for user profile management
router.get('/:userId', getUserProfile);
router.post('/', createUserProfile);
router.put('/:userId', updateUserProfile);

module.exports = router;
