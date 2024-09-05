const User = require("../../models/userModel");
const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError("Your current password is incorrect", 401));
  }

  user.password = newPassword;
  user.passwordConfirm = confirmPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
  });
});
