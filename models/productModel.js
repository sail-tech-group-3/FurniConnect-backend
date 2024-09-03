const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
    maxlength: [
      400,
      "A product name must have less or equal than 400 characters",
    ],
    minlength: [5, "A product name must have at least 5 characters"],
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
    min: [0, "Price must be at least 0"],
    validate: {
      validator: function (value) {
        return typeof value === "number";
      },
      message: "Price must be a number",
    },
  },
  productType: {
    type: String,
    required: [true, "A product must have a type"],
    enum: {
      values: ["Chairs", "Tables", "Beds"],
      message: "Difficulty is either: easy, medium, difficult",
    },
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  availableInStock: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Product must have a description"],
  },
  images: [String],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: String,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
