const fs = require("fs");
const tickets = JSON.parse(fs.readFileSync("./data/dev-data.json"));

exports.getAllFlights = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tickets.length,
    data: tickets,
  });
};
