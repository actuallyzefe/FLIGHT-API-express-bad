const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  res.status(404).json({
    status: "Error",
    message: "This has not implemented",
  });
};

exports.deleteUser = async (req, res) => {};
