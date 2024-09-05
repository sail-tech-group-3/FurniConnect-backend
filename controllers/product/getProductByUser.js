const Product = require("../../models/productModel");
const APIFeatures = require("../../utils/apiFeatures");
const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find({ createdBy: req.user.userName }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;
  const total = await Product.countDocuments({ createdBy: req.user.userName });

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
      total,
    },
  });
});
