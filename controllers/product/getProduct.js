const Product = require("../../models/productModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

module.exports = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
