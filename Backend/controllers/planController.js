const Plan = require('../models/plan_model');                    // Fixed import
const Subscription = require('../models/subscription_model');    // Fixed import

// Get all active plans (for users to browse)
const getActivePlans = async (req, res) => {
  try {
    const plans = await Plan.find({ active: true });  // Changed from status: 'Active' to active: true
    res.json({ success: true, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all plans (for admin)
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json({ success: true, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new plan (admin only)
const createPlan = async (req, res) => {
  try {
    const { name, description, type, billingCycleDays, quotaGB, price } = req.body;
    
    // Validate required fields based on your schema
    if (!name || !type || !billingCycleDays || !quotaGB || !price) {
      return res.status(400).json({ success: false, message: 'Missing required fields: name, type, billingCycleDays, quotaGB, price' });
    }

    // Validate type enum
    if (!['FIBERNET', 'COPPER', 'OTHER'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid type. Must be FIBERNET, COPPER, or OTHER' });
    }

    const newPlan = new Plan({
      name,
      description,
      type,
      billingCycleDays,
      quotaGB,
      price,
      active: true,
      createdBy: req.user ? req.user._id : null, // From authenticated user
      updatedAt: new Date()
    });

    await newPlan.save();
    res.status(201).json({ success: true, data: newPlan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update plan (admin only)
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Add updatedAt timestamp
    const updateData = { ...req.body, updatedAt: new Date() };
    
    const updatedPlan = await Plan.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedPlan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    res.json({ success: true, data: updatedPlan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete plan (admin only)
const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Set active to false instead of status to 'Inactive'
    const plan = await Plan.findByIdAndUpdate(
      id, 
      { active: false, updatedAt: new Date() }, 
      { new: true }
    );
    
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    res.json({ success: true, message: 'Plan deactivated successfully', data: plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getActivePlans,
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan
};
