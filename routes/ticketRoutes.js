const express = require("express");
const { getAllTickets } = require("../controllers/ticketController");
const app = express();
const router = express.Router();

router.route("/").get(getAllTickets);

module.exports = router;
