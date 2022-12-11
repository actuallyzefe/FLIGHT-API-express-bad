const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();
const app = require('./../app');

router.route('/').get(userController.getAllUsers);

router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:resetToken').patch(authController.resetPassword);

// PROTECTED ROUTES
router.use(authController.protect);

router.route('/updatePassword').patch(authController.updatePassword);

module.exports = router;
