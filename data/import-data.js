const mongoose = require("mongoose");
const fs = require("fs");
const Flight = require("../models/ticketModel");
const User = require("../models/userModel");
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
const flights = JSON.parse(fs.readFileSync(`./data/flight-data.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`./data/user-data.json`, "utf-8"));

// IMPORT TO DB
const importData = async () => {
  try {
    await Flight.create(flights);
    await User.create(users);
    console.log("DATA SUCCESSFULLY IMPORTED");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE FROM DB
const deleteData = async () => {
  try {
    await Flight.deleteMany();
    await User.deleteMany();
    console.log("DATA SUCCESSFULLY DELETED");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
