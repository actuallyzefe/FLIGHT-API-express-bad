const express = require('express');
const {
  getAllFlights,
  getSingleFlight,
} = require('../controllers/flightController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').get(getAllFlights);
// router.route("/payment").checkout(payTicket);

router.route('/:id').get(getSingleFlight);
module.exports = router;
