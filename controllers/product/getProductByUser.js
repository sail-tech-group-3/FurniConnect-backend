const Product = require("../../models/productModel");
const APIFeatures = require("../../utils/apiFeatures");
const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  // Ensure the `username` field is correct. Change `req.user.username` to `req.user.userName` if needed.
  const features = new APIFeatures(
    Product.find({ createdBy: req.user.userName }), // Use the correct field based on your `req.user` structure
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate(); // Apply pagination

  const products = await features.query;
  const total = await Product.countDocuments({ createdBy: req.user.userName }); // Total count of products for pagination

  res.status(200).json({
    status: "success",
    data: {
      products,
      total,
    },
  });
});
