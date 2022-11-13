require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60,
  });
};
