const express = require("express");

const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");
const router = express.Router();

// Protect all routes from here on
router.use(authController.protect);

router.route("/:userId").get(orderController.getOrdersByUser);

router.use(authController.restrictTo("admin"));
router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router.route("/:id").delete(orderController.deleteOrder);

module.exports = router;
