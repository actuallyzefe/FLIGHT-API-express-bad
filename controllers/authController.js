const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");

// Create Token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Sign Up
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      gender: req.body.gender,
    });
    const token = signToken(newUser._id);

    // newUser.password = undefined;

    res.status(201).json({
      status: "Success",
      token: token,
      data: newUser,
    });
  } catch (err) {
    console.log(err);
  }
};

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new appError("BADFSDFB"), 401);
  }
  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new appError("Incorrect email or password"), 401);
  }
  // const correct = user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Incorrect email or password"), 401);
  }
  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "Success",
    token,
  });
});
