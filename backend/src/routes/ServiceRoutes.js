const express = require('express');
const { 
  createService, 
  getCustomerServices, 
  getProviderServices, 
  updateServiceStatus 
} = require('../controllers/ServiceController');
const { protect } = require('../middleware/AuthMiddleware');

const router = express.Router();

// Customer routes
router.route('/')
  .post(protect, createService)
  .get(protect, getCustomerServices);

// Provider routes
router.route('/provider')
  .get(protect, getProviderServices);

router.route('/:id/status')
  .put(protect, updateServiceStatus);

module.exports = router;