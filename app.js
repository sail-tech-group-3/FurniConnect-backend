const express = require("express");
const cors = require("cors");
const path = require("path");
const AppError = require("./utils/appError");

const globalErrorHandler = require("./controllers/error/globalErrorHanler");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const paystackRoutes = require("./routes/paystackRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

require("dotenv").config({ path: path.join(__dirname, "config.env") });

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/paystack", paystackRoutes);
app.use("/api/v1/orders", orderRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
