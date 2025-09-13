// controllers/subscription_controller.js
const Plan = require('../models/plan_model');
const Subscription = require('../models/subscription_model');

// Subscribe to a plan for a user
exports.create_subscribe = async (req, res) => {
  try {
    const { planId, discountId } = req.body;
    const userId = req.user._id; // Fixed: use _id instead of id

    const plan = await Plan.findById(planId);
    if (!plan || !plan.active) {
      return res.status(400).json({ error: "Invalid plan or plan is inactive" });
    }

    const existing = await Subscription.findOne({ userId, status: 'ACTIVE' });
    if (existing) {
      return res.status(409).json({ error: "User already has an active subscription" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.billingCycleDays);

    const subscription = await Subscription.create({
      userId,
      planId,
      startDate,
      endDate,
      status: 'ACTIVE',
      discountId: discountId || null,
      price: plan.price, // Added required price field
      updatedAt: new Date()
    });

    // Populate plan details before returning
    await subscription.populate('planId');

    return res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Change subscription plan (upgrade/downgrade)
exports.changePlan = async (req, res) => {
  try {
    const userId = req.user._id; // Fixed: use _id instead of id
    const subscriptionId = req.params.id;
    const { newPlanId } = req.body;

    // 1. Find existing subscription
    const currentSub = await Subscription.findOne({ _id: subscriptionId, userId });
    if (!currentSub) {
      return res.status(404).json({ error: "Subscription not found" });
    }
    if (currentSub.status !== 'ACTIVE') {
      return res.status(400).json({ error: "Only active subscriptions can be changed" });
    }

    // 2. Find new plan
    const newPlan = await Plan.findById(newPlanId);
    if (!newPlan || !newPlan.active) {
      return res.status(400).json({ error: "Invalid new plan or plan is inactive" });
    }

    // 3. Get current plan for comparison
    const currentPlan = await Plan.findById(currentSub.planId);
    if (!currentPlan) {
      return res.status(400).json({ error: "Current plan not found" });
    }

    // 4. Decide upgrade or downgrade based on price comparison
    if (newPlan.price > currentPlan.price) {
      return upgradePlan(currentSub, newPlan, userId, res);
    } else if (newPlan.price < currentPlan.price) {
      return downgradePlan(currentSub, newPlan, userId, res);
    } else {
      return res.status(400).json({ error: "New plan has the same price, no change needed" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Helper function: Upgrade
async function upgradePlan(currentSub, newPlan, userId, res) {
  try {
    // Mark old subscription as upgraded
    currentSub.status = 'UPGRADED';
    currentSub.endDate = new Date();
    currentSub.updatedAt = new Date();
    await currentSub.save();

    // Create new subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + newPlan.billingCycleDays);

    const newSub = await Subscription.create({
      userId,
      planId: newPlan._id,
      startDate,
      endDate,
      status: 'ACTIVE',
      price: newPlan.price, // Added required price field
      updatedAt: new Date()
    });

    // Populate plan details
    await newSub.populate('planId');

    return res.status(200).json({
      success: true,
      message: "Plan upgraded successfully",
      data: {
        oldSubscription: {
          id: currentSub._id,
          status: currentSub.status,
          endDate: currentSub.endDate
        },
        newSubscription: {
          id: newSub._id,
          planName: newPlan.name, // Fixed: use newPlan.name directly
          planType: newPlan.type,
          status: newSub.status,
          startDate: newSub.startDate,
          endDate: newSub.endDate,
          price: newSub.price
        }
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error upgrading plan" });
  }
}

// Helper function: Downgrade
async function downgradePlan(currentSub, newPlan, userId, res) {
  try {
    // Mark old subscription as downgraded
    currentSub.status = 'DOWNGRADED';
    currentSub.endDate = new Date();
    currentSub.updatedAt = new Date();
    await currentSub.save();

    // Create new subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + newPlan.billingCycleDays);

    const newSub = await Subscription.create({
      userId,
      planId: newPlan._id,
      startDate,
      endDate,
      status: 'ACTIVE',
      price: newPlan.price, // Added required price field
      updatedAt: new Date()
    });

    // Populate plan details
    await newSub.populate('planId');

    return res.status(200).json({
      success: true,
      message: "Plan downgraded successfully",
      data: {
        oldSubscription: {
          id: currentSub._id,
          status: currentSub.status,
          endDate: currentSub.endDate
        },
        newSubscription: {
          id: newSub._id,
          planName: newPlan.name, // Fixed: use newPlan.name directly
          planType: newPlan.type,
          status: newSub.status,
          startDate: newSub.startDate,
          endDate: newSub.endDate,
          price: newSub.price
        }
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error downgrading plan" });
  }
}

// Cancel subscription immediately
exports.cancel = async (req, res) => {
  try {
    const userId = req.user._id; // Fixed: use _id instead of id
    const subscriptionId = req.params.id;

    // 1. Find subscription owned by user
    const subscription = await Subscription.findOne({ _id: subscriptionId, userId });
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    // 2. Check if already cancelled
    if (subscription.status === 'CANCELLED') {
      return res.status(400).json({ error: "Subscription is already cancelled" });
    }

    // 3. Cancel immediately
    subscription.status = 'CANCELLED';
    subscription.endDate = new Date();
    subscription.updatedAt = new Date();
    await subscription.save();

    // 4. Return response
    return res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      data: {
        id: subscription._id,
        status: subscription.status,
        endDate: subscription.endDate,
        price: subscription.price
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get user's subscriptions
exports.getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user._id;

    const subscriptions = await Subscription.find({ userId })
      .populate('planId')
      .populate('discountId')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: subscriptions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Renew subscription
exports.renewSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const subscriptionId = req.params.id;

    const subscription = await Subscription.findOne({ _id: subscriptionId, userId });
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    if (subscription.status !== 'EXPIRED') {
      return res.status(400).json({ error: "Only expired subscriptions can be renewed" });
    }

    // Get the plan details
    const plan = await Plan.findById(subscription.planId);
    if (!plan || !plan.active) {
      return res.status(400).json({ error: "Plan is no longer available" });
    }

    // Renew subscription
    const newEndDate = new Date();
    newEndDate.setDate(newEndDate.getDate() + plan.billingCycleDays);

    subscription.status = 'ACTIVE';
    subscription.startDate = new Date();
    subscription.endDate = newEndDate;
    subscription.updatedAt = new Date();
    
    await subscription.save();

    return res.status(200).json({
      success: true,
      message: "Subscription renewed successfully",
      data: subscription
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  create_subscribe: exports.create_subscribe,
  changePlan: exports.changePlan,
  cancel: exports.cancel,
  getUserSubscriptions: exports.getUserSubscriptions,
  renewSubscription: exports.renewSubscription
};
