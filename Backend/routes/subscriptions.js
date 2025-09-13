const express = require('express');
const { authenticateToken } = require('../middlewares/auth_middleware');
const Subscription = require('../models/subscription_model');
const SubscriptionPlan = require('../models/plan_model');

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
router.post('/subscribe', authenticateToken, async (req, res) => {
  try {
    const { planId, subscriptionType } = req.body;

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    const subscription = new Subscription({
      userId: req.user._id,
      planId,
      subscriptionType,
      status: 'ACTIVE',                 // Use upcased status to match your schema's enum
      startDate: new Date(),
      lastBilledDate: new Date(),
      price: plan.price                 // Always add price if required in your model
    });

    await subscription.save();
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Cancel subscription
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    subscription.status = 'CANCELLED';     // Use upcased status to match your schema's enum
    subscription.terminatedDate = new Date();
    await subscription.save();

    res.json({ success: true, message: 'Subscription cancelled successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
