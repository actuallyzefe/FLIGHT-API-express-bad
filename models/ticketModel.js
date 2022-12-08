const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A flight Must have name"],
  },
  date: Date,
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
