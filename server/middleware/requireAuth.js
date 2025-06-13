const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.Authorization;

    console.log("token", token);
    if (!token) return res.status(401).json({ message: "No token available" });

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    console.log("decode.exp", decode.exp);
    console.log("date", Date.now());

    const currentDate = Math.floor(Date.now() / 1000);

    if (currentDate > decode.exp)
      return res.status(401).json({ message: "unauthorized user" });

    const user = await User.findById(decode.userId);
    console.log('user', user)

    if (!user) return res.status(401).json({ message: "Not allowed" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "ererere" + error.message });
  }
};

module.exports = requireAuth;
