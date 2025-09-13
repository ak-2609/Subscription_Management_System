const express = require('express');
const { authenticateToken } = require('../middlewares/auth_middleware');
const Subscription = require('../models/Subscription');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const subscription_controller= require('../controllers/subscription_controller');

const router = express.Router();

// Get user's subscriptions
router.get('/my-subscriptions', authenticateToken, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user._id })
      .populate('planId');
    res.json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Subscribe to a plan
router.post('/subscribe', authenticateToken,subscription_controller.create_subscribe);

// Upgrade or downgrade subscription
router.put('/:id/change-plan', authenticateToken, subscription_controller.change_plan);

// Cancel subscription
router.put('/:id/cancel', authenticateToken, subscription_controller.cancel);

module.exports = router;
