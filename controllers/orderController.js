const createOrder = require("./orders/createOrders");
const deleteOrder = require("./orders/deleteOrder");
const getAllOrders = require("./orders/getAllOrders");
const getOrdersByUser = require("./orders/getOrdersByUser");

module.exports = {
  createOrder,
  getAllOrders,
  deleteOrder,
  getOrdersByUser,
};
