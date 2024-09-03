const axios = require("axios");

module.exports = async (req, res) => {
  const { reference } = req.query;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === "success") {
      res.status(200).json({
        status: "success",
        data: { message: "Payment successful", data: paymentData },
      });
    } else {
      res.status(400).json({ message: "Payment failed", data: paymentData });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Payment verification failed", details: error.message });
  }
};
