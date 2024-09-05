const signup = require("./auth/signup");
const login = require("./auth/login");
const protect = require("./auth/protect");
const restrictTo = require("./auth/restrictTo");
const updatePassword = require("./auth/updatePassword");

module.exports = {
  signup,
  login,
  protect,
  restrictTo,
  updatePassword,
};
