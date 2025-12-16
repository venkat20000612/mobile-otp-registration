const express = require("express");
const router = express.Router();
const User = require("../models/users");
const tempUsers = require("../utils/tempUsers");

router.post("/", async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const tempUser = tempUsers[mobile];
    if (!tempUser) {
      return res.status(400).json({ message: "OTP not generated" });
    }

    if (Date.now() > tempUser.otpExpires) {
      delete tempUsers[mobile];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verified → SAVE USER
    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      mobile: tempUser.mobile,
      password: tempUser.password,
      isVerified: true
    });

    await newUser.save();
    delete tempUsers[mobile];

    res.json({ message: "Registration completed successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
