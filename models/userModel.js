const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have name"],
  },
  gender: {
    type: String,
    required: [true, "A user must have gender"],
  },
  adult: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
