const express = require("express");
const { getAllFlights } = require("../controllers/ticketController");

const router = express.Router();

router.route("/").get(getAllFlights);
// router.route("/payment").checkout(payTicket);
module.exports = router;
