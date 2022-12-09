const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

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

    res.status(201).json({
      status: "Success",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err,
    });
  }
};
