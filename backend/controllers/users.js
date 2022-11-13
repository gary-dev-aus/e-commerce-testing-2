require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { handleErrors } = require("../functions/handleErrors");
const { createToken } = require("../functions/createToken");

module.exports.getMe = (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token && token !== process.env.API_KEY) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
      } else {
        let user = await User.findById(decodedToken.id);
        res
          .status(200)
          .json({ user: { id: user._id, username: user.username } });
      }
    });
  }
};

module.exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * parseInt(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60,
      sameSite: "Lax",
    });
    res.status(201).json({ user: { id: user._id, username: user.username } });
    console.log("New user registered:", username);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
