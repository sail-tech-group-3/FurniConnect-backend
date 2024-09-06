const express = require("express");

const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.use(authController.protect);

router.route("/:userId").get(orderController.getOrdersByUser);

router
  .route("/")
  .get(authController.restrictTo("admin"), orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .delete(authController.restrictTo("admin"), orderController.deleteOrder);

module.exports = router;
