const express = require('express');
const router = express.Router();
const { getBrandCollaborations, createBrandCollaboration, updateBrandCollaboration } = require('../controllers/brandController');

// Routes for brand collaboration management
router.get('/:brandId', getBrandCollaborations);
router.post('/', createBrandCollaboration);
router.put('/:brandId', updateBrandCollaboration);

module.exports = router;
