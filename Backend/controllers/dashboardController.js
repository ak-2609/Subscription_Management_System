const Subscription = require('../models/subscription_model');  // Fixed import
const Plan = require('../models/plan_model');                  // Fixed import

// Get dashboard analytics for admin
const getDashboardStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const currentYear = new Date(currentDate.getFullYear(), 0, 1);

    // Total subscriptions
    const totalSubscriptions = await Subscription.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'ACTIVE' });
    const cancelledSubscriptions = await Subscription.countDocuments({ status: 'CANCELLED' });
    const expiredSubscriptions = await Subscription.countDocuments({ status: 'EXPIRED' });

    // Monthly stats (using createdAt since that's in your schema)
    const monthlySubscriptions = await Subscription.countDocuments({
      createdAt: { $gte: currentMonth }
    });

    // Yearly stats  
    const yearlySubscriptions = await Subscription.countDocuments({
      createdAt: { $gte: currentYear }
    });

    // Top plans with plan details populated
    const topPlans = await Subscription.aggregate([
      { $match: { status: 'ACTIVE' } },
      { $group: { _id: '$planId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { 
        $lookup: { 
          from: 'plans',           // Collection name (lowercase plural)
          localField: '_id', 
          foreignField: '_id', 
          as: 'planDetails' 
        } 
      },
      {
        $project: {
          planId: '$_id',
          subscriptionCount: '$count',
          planName: { $arrayElemAt: ['$planDetails.name', 0] },
          planType: { $arrayElemAt: ['$planDetails.type', 0] },
          planPrice: { $arrayElemAt: ['$planDetails.price', 0] }
        }
      }
    ]);

    // Additional analytics for better insights
    const subscriptionsByType = await Plan.aggregate([
      {
        $lookup: {
          from: 'subscriptions',
          localField: '_id',
          foreignField: 'planId',
          as: 'subscriptions'
        }
      },
      {
        $project: {
          type: 1,
          totalSubscriptions: { $size: '$subscriptions' },
          activeSubscriptions: {
            $size: {
              $filter: {
                input: '$subscriptions',
                cond: { $eq: ['$$this.status', 'ACTIVE'] }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: '$type',
          totalPlans: { $sum: 1 },
          totalSubscriptions: { $sum: '$totalSubscriptions' },
          activeSubscriptions: { $sum: '$activeSubscriptions' }
        }
      }
    ]);

    // Revenue calculation (based on active subscriptions)
    const totalRevenue = await Subscription.aggregate([
      { $match: { status: 'ACTIVE' } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    const monthlyRevenue = await Subscription.aggregate([
      { 
        $match: { 
          status: 'ACTIVE',
          createdAt: { $gte: currentMonth }
        } 
      },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalSubscriptions,
        activeSubscriptions,
        cancelledSubscriptions,
        expiredSubscriptions,
        monthlySubscriptions,
        yearlySubscriptions,
        topPlans,
        subscriptionsByType,
        revenue: {
          total: totalRevenue[0]?.total || 0,
          monthly: monthlyRevenue[0]?.total || 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardStats };
