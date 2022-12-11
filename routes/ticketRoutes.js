const express = require('express');
const { getAllFlights } = require('../controllers/ticketController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/').get(getAllFlights);
// router.route("/payment").checkout(payTicket);
module.exports = router;
