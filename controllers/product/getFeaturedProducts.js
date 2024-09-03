const Product = require("../../models/productModel");
const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (_req, res, _next) => {
  const featuredProducts = await Product.find({ isFeatured: true });

  res.status(200).json({
    status: "success",
    results: featuredProducts.length,
    data: {
      products: featuredProducts,
    },
  });
});
