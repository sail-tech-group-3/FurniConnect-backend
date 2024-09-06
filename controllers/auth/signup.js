const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = catchAsync(async (req, res, _next) => {
  if (req.body.phoneNumber)
    req.body.phoneNumber = `+234${req.body.phoneNumber}`;

  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});
