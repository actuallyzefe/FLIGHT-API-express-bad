const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
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

  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [validator.isEmail, "Please provide an valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    select: false,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same.",
    },
  },
});

// SECURITY
// HASHING PASSWORDS
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (canPass, userPass) {
  return await bcrypt.compare(canPass, userPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
