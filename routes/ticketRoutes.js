const express = require("express");
const { getAllFlights } = require("../controllers/ticketController");

const router = express.Router();

router.route("/").get(getAllFlights);

module.exports = router;
