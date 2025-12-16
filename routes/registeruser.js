const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const registerValidation = require("../middleware/registerValidation");
const tempUsers = require("../utils/tempUsers");

router.post("/", registerValidation, async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;

    // OTP generate
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // TEMP store (NOT DB)
    tempUsers[mobile] = {
      username,
      email,
      mobile,
      password: await bcrypt.hash(password, 10),
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000
    };

    console.log("REGISTER OTP:", otp);

    res.status(200).json({
      message: "OTP sent to mobile. Please verify OTP to complete registration"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
