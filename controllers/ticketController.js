const fs = require("fs");
const tickets = JSON.parse(fs.readFileSync("./data/dev-data.json"));

exports.getAllTickets = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: tickets,
  });
};
