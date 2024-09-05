const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  email = email.toLowerCase();

  const user = await User.findOne({ email }).select("+password");

  const isCorrectPassword =
    user && (await user.correctPassword(password, user.password));

  if (!isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
