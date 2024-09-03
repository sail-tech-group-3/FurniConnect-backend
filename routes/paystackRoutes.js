const express = require("express");
const initializePayment = require("../controllers/paystack/InitializePayment");
const verifyPayment = require("../controllers/paystack/verifyPayment");

const router = express.Router();

router.post("/pay", initializePayment);
router.get("/verify", verifyPayment);

module.exports = router;
