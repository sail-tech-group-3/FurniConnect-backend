const Order = require("../../models/orderModel");
const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: orders,
  });
});
