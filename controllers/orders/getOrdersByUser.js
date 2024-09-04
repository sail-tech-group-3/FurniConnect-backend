const Order = require("../../models/orderModel");
const APIFeatures = require("../../utils/apiFeatures");
const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  console.log(req.params);

  const features = new APIFeatures(Order.find({ user: userId }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const orders = await features.query;

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});
