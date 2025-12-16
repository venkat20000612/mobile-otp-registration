const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/users");

router.post("/", async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    if ((!email && !mobile) || !password) {
      return res
        .status(400)
        .json({ message: "Email or Mobile and password required" });
    }

    const user = await User.findOne({
      $or: [{ email }, { mobile }]
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify OTP before login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
