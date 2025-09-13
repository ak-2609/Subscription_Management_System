const express = require('express');
const { signup, login } = require('../controllers/auth_controller.js');
const auth_middleware = require('../middlewares/auth_middleware.js');
const user_controller = require('../controllers/user_controller.js');
const router = express.Router();

router.post('/user/register', signup);
router.post('/user/login', login);

router.get(
  '/user/profiles',
  auth_middleware.authenticateToken,
  auth_middleware.roleAuthorization,
  user_controller.getAllUsers
);

router.get(
  '/user/profile',
  auth_middleware.authenticateToken,
  auth_middleware.roleAuthorization,
  user_controller.getUserById
);

router.put(
  '/user/update',
  auth_middleware.authenticateToken,
  auth_middleware.roleAuthorization,
  user_controller.updateUser
);

router.delete(
  '/user/delete',
  auth_middleware.authenticateToken,
  auth_middleware.roleAuthorization,
  user_controller.deleteUser
);

module.exports = router;