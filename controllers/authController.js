const jwt = require("jsonwebtoken");
const { promisify } = require("util");
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
      passwordChangedAt: req.body.passwordChangedAt,
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
    res.status(401).json({
      status: "Fail",
      message: err,
    });
  }
};

// Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new appError("No user found with that data"), 401);
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
};

// Protected Routes
exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new appError("You are not Logged in. Log in to buy tickets.", 401)
    );
  }
  //2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  //3) Check if user exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new appError("This user no longer exists", 401));
  }
  //4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new appError("USER RECENTLY CHANGED PASSWORD"));
  }
  // GRANT ACCESS TO PROTECTED ROUTES
  req.user = currentUser;
  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {});
