const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

const router = express.Router();
router.use(authController.protect);
router.patch("/updateMe", userController.updateMe);
router.patch("/updatePassword", authController.updatePassword);

router.delete("/deleteMe", userController.deleteMe);
router.get("/me", userController.getMe);
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    adminController.getAllUsers
  )
module.exports = router;
