const User = require("../../models/userModel");
const Product = require("../../models/productModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

module.exports = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  await Product.deleteMany({ createdBy: user._id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
