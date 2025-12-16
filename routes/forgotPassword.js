const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const User = require("../models/users");
const transporter = require("../config/mailer");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    // 🔑 SAVE TOKEN IN DB (MOST IMPORTANT)
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000;

    await user.save(); // ❗ THIS WAS MISSING

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `
        <p>You requested a password reset</p>
        <p>Click below link to reset password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link is valid for 15 minutes</p>
      `
    });

    console.log("RESET TOKEN SAVED IN DB:", token);

    res.status(200).json({ message: "Reset password link sent to email" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
