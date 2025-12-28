require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const allowedUsername = process.env.LOGIN_USERNAME;
    const allowedPasswordHash = process.env.LOGIN_PASSWORD_HASH;

    if (username !== allowedUsername) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = bcrypt.compare(password, allowedPasswordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Optional: issue token so frontend can stay logged in
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("Login successful");
    console.log(token, username);

    return res.json({
      message: "Login successful",
      token,
      user: { username },
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.me = async (req, res) => {
  // req.user comes from middleware/auth.js
  return res.json({ user: { username: req.user.username } });
};
