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

// Load environment variables
require("dotenv").config({ path: path.join(__dirname, "config.env") });

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (if you have any) from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); // Directory where your Pug templates are located

// Routes
app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/paystack", paystackRoutes);
app.use("/api/v1/orders", orderRoutes);

// Handle 404 errors
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
