require("dotenv").config();
const jwt = require("jsonwebtoken");
const { handleErrors } = require("../functions/handleErrors");

module.exports.requireAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // Check: api key then for json web token exists & is verified
  if (token === process.env.API_KEY) {
    next();
  } else if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.log(err.message);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ errors: { message: "Unauthorized" } });
  }
};
