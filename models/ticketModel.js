const { default: mongoose, mongo } = require("mongoose");

const flightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A flight Must have name"],
  },
  date: Date,
});
