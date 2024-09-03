const signup = require("./auth/signup");
const login = require("./auth/login");
const logout = require("./auth/logout");
const protect = require("./auth/protect");
const restrictTo = require("./auth/restrictTo");
const updatePassword = require("./auth/updatePassword");

module.exports = {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  updatePassword,
};
