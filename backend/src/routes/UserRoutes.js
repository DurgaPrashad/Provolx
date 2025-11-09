const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/UserController');
const { protect } = require('../middleware/AuthMiddleware');

const router = express.Router();

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;