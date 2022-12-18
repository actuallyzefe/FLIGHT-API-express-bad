const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A flight Must have name'],
  },
  price: {
    type: Number,
    required: [true, 'A flight Must have PRICE'],
  },
  airline: {
    type: String,
    required: [true, 'A plane Must have AIRLINE NAME'],
  },
  date: Date,
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
