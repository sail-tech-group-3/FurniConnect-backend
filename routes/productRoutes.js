const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();
console.log(productController.updateProduct);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(authController.protect, productController.createProduct);

router.get("/featured", productController.getFeaturedProducts);

router.get(
  "/created-by-user",
  authController.protect,
  productController.getProductByUser
);
router
  .route("/:id")
  .get(productController.getProduct)
  .patch(authController.protect, productController.updateProduct)
  .delete(authController.protect, productController.deleteProduct);

module.exports = router;
