require("dotenv").config();
const User = require("../models/User");
const { handleErrors } = require("../functions/handleErrors");
const { createToken } = require("../functions/createToken");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * parseInt(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60,
      sameSite: "Lax",
    });
    res.status(200).json({ user: { id: user._id, username: user.username } });
    console.log("User logged in:", user.username);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
