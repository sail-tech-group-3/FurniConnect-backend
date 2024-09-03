const {createProduct,updateProduct} = require("./product/createProduct");
const deleteProduct = require("./product/deleteProduct");
const getAllProducts = require("./product/getAllProducts");
const getFeaturedProducts = require("./product/getFeaturedProducts");
const getProduct = require("./product/getProduct");
const getProductByUser = require("./product/getProductByUser");


module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getFeaturedProducts,
  getProductByUser,
  updateProduct
};
