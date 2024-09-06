const User = require("../../models/userModel");
const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (req, res, _next) => {
  if (req.body.phoneNumber)
    req.body.phoneNumber = `+234${req.body.phoneNumber}`;
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
