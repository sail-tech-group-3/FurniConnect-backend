const User = require("../../models/userModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const mongoose = require("mongoose"); // Import mongoose

module.exports = catchAsync(async (req, res, next) => {
  // Log incoming user ID and its type for debugging
  console.log("Incoming user ID:", req.params.id);
  console.log("Type of userId:", typeof req.params.id);

  // Validate the ObjectId format
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new AppError("Invalid user ID format", 400));
  }

  // Perform the update
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
