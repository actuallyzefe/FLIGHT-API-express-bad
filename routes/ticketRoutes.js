const express = require("express");
const { getAllTickets } = require("../controllers/ticketController");
const router = express.Router();

router.route("/").get(getAllTickets);

module.exports = router;
