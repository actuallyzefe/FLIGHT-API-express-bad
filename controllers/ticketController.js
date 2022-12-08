const fs = require("fs");
const Flight = require("../models/ticketModel");
const tickets = JSON.parse(fs.readFileSync("./data/dev-data.json"));

exports.getAllFlights = async (req, res) => {
  try {
    const tickets1 = await Flight.find();
    res.status(200).json({
      status: "Success",
      results: tickets.length,
      data: tickets,
    });
  } catch (err) {
    console.log(err);
  }
};
