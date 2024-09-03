require("dotenv").config({ path: "config.env" });
const User = require("../../models/userModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const multer = require("multer");
const cloudinary = require("../../utils/cloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "jpg",
    public_id: (req, file) => `profile-${req.user.id}-${Date.now()}`,
  },
});

const upload = multer({ storage });

const uploadPhoto = upload.single("photo");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

module.exports = [
  uploadPhoto,
  catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "This route is not for password updates. Please use /updateMyPassword.",
          400
        )
      );
    }

    const filteredBody = filterObj(
      req.body,
      "fullName",
      "email",
      "phoneNumber"
    );

    // If a new photo is uploaded, add the photo URL to the filteredBody
    if (req.file) {
      filteredBody.photo = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }),
];
