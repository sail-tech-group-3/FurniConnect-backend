const axios = require("axios");
const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (req, res) => {
  const { email, amount, date } = req.body;

  const params = {
    email,
    amount: amount * 100,
    date,
    callback_url: `${process.env.CALLBACK_URL}`,
  };

  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    params,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  res.status(200).json({
    status: "success",
    data: { authorizationUrl: response.data.data.authorization_url },
  });
});
