const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../utils/cloudinaryConfig");
const Product = require("../../models/productModel");
const User = require("../../models/userModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "jpg",
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
  },
});

const upload = multer({ storage: storage });

const createProduct = [
  upload.array("images", 5),
  catchAsync(async (req, res, next) => {
    try {
      const fields = {
        name: req.body.name,
        price: req.body.price,
        productType: req.body.productType,
        description: req.body.description,
        images: req.files.map((file) => file.path),
        isFeatured: req.body.isFeatured || false,
        createdBy: req.user.userName,
      };
      const newProduct = await Product.create(fields);

      const user = await User.findOne({ userName: req.user.userName });
      if (user) {
        await user.incrementProductCount();
      } else {
        console.error("User not found.");
      }
      res.status(201).json({
        status: "success",
        data: {
          product: newProduct,
        },
      });
    } catch (err) {
      console.error("Error creating product:", err);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }),
];

const updateProduct = [
  upload.array("images", 5),
  catchAsync(async (req, res, next) => {
    try {
      console.log("Request body:", req.body);
      console.log("Request files:", req.files);

      const updateFields = {
        name: req.body.name,
        description: req.body.description,
        productType: req.body.productType,
        price: req.body.price,
        isFeatured: req.body.isFeatured || false,
      };

      // Only update images if new files were uploaded
      if (req.files && req.files.length > 0) {
        updateFields.images = req.files.map((file) => file.path);
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updateFields,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!product) {
        return next(new AppError("No product found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          product,
        },
      });
    } catch (err) {
      console.error("Error updating product:", err);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }),
];

module.exports = {
  updateProduct,
  createProduct,
};
