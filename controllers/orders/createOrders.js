const Order = require("../../models/orderModel");
const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (req, res) => {
  const { items, totalAmount, customerName, customerEmail } = req.body;

  const order = new Order({
    user: req.user._id,
    items,
    totalAmount,
    customerName,
    customerEmail,
  });

  const savedOrder = await order.save();

  res.status(201).json({
    status: "success",
    data: {
      order: savedOrder,
    },
  });
});
