const express = require('express');
const {
  getActivePlans,
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan
} = require('../controllers/planController');      // ← matches controllers/planController.js
const { authenticateToken, requireAdmin } = require('../middlewares/auth_middleware');

const router = express.Router();


// Anyone can browse active plans
router.get('/active', getActivePlans);


// All routes below require a valid token AND admin role
router.use(authenticateToken, requireAdmin);

router.get('/', getAllPlans);          // List every plan
router.post('/', createPlan);          // Create a new plan
router.put('/:id', updatePlan);        // Update a plan
router.delete('/:id', deletePlan);     // Soft-delete (deactivate) a plan

module.exports = router;
