const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A flight Must have name"],
  },
  price: {
    type: Number,
    required: [true, "A flight Must have PRICE"],
  },
  date: Date,
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
