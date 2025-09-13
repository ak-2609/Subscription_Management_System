const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const { authenticateToken, requireAdmin } = require('../middlewares/auth_middleware');

const router = express.Router();

// Admin dashboard stats
router.get('/stats', authenticateToken, requireAdmin, getDashboardStats);

module.exports = router;
