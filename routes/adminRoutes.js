const express = require("express");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    adminController.getAllUsers
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    adminController.createUser
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    adminController.getUser
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    adminController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    adminController.deleteUser
  );

module.exports = router;
