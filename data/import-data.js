const fs = require("fs");
const Flight = require("../models/ticketModel");
const mongoose = require("mongoose");
const { dirname } = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("Successfully connected to db"));

// READ JSON FILE
const flights = JSON.parse(fs.readFileSync(`./data/dev-data.json`, "utf-8"));

// IMPORT TO DB
const importData = async () => {
  try {
    await Flight.create(flights);
    console.log("DATA SUCCESSFULLY IMPORTED");
  } catch (err) {
    console.log(err);
  }
};

// DELETE FROM DB
const deleteData = async () => {
  try {
    await Flight.deleteMany();
    console.log("DATA SUCCESSFULLY DELETED");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
