require("dotenv").config();
const jwt = require("jsonwebtoken");
const { handleErrors } = require("./handleErrors");

const User = require("../models/User");

module.exports.getUserId = async (token) => {
  if (token && token !== process.env.API_KEY) {
    let user;
    await jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          const errors = handleErrors(err);
          res.status(400).json({ errors });
        } else {
          user = await User.findById(decodedToken.id);
        }
      }
    );
    return user._id.toString();
  }
};
