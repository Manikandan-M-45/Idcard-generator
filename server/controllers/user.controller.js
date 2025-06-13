const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

// register
const register = async (req, res) => {
  try {
    const { user, pass } = req.body;

    if (user === "" || pass === "") {
      return res.status(400).json({ message: "Fields must be filled!" });
    }

    const hashedPass = await bcrypt.hash(pass, 10);
    const newUser = new User({
      user,
      pass: hashedPass,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
const login = async (req, res) => {
  try {
    const { user, pass } = req.body;

    if (user === "" || pass === "") {
      return res.status(400).json({ message: "Fields must be filled!" });
    }

    const foundUser = await User.findOne({ user });

    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
    }
    const confirmPass = await bcrypt.compare(pass, foundUser.pass);

    if (!confirmPass)
      return res.status(400).json({ message: "Password does not match" });

    // 30 days from now in milliseconds
    const expMs = Date.now() + 1000 * 60 * 60 * 24 * 30;

    // JWT expects exp in seconds (UNIX timestamp)
    const exp = Math.floor(expMs / 1000);

    // create jwt token
    const token = jwt.sign({ userId: foundUser._id,exp }, SECRET_KEY);

    // store token in cookie
    res.cookie("Authorization", token, {
      expires: new Date(expMs),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in login " + error.message });
  }
};

// logout
const logout = (req, res) => {
  try {
    res.cookie("Authorization", "", { expires: new Date() });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const checkAuth = (req, res) => {
  try{
    res.status(200).json({message: "ok"})
  }catch(error){
    res.status(500).json({message: error.message})
  }
}

module.exports = {
  register,
  login,
  logout,
  checkAuth
};
