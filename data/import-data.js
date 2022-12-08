const fs = require("fs");
const Flight = require("../models/ticketModel");
const flights = JSON.parse(fs.readFileSync("./data/dev-data.json"));

const importData = async () => {
  try {
    await Flight.create(flights);

    console.log("Data Successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
}
