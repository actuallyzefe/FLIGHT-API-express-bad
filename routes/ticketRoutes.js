const express = require("express");
const {
  getAllFlights,
  createFlight,
} = require("../controllers/ticketController");

const router = express.Router();

router.route("/").get(getAllFlights);
router.route("/").post(createFlight);

module.exports = router;
