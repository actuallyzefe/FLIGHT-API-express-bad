const express = require('express');
const ticketControler = require('./../controllers/ticketController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get(
  '/checkout-session/:id',
  authController.protect,
  ticketControler.getCheckoutSession
);

module.exports = router;
