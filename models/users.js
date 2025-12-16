const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    // OTP fields
    otp: String,
    otpExpires: Date,

    isVerified: {
      type: Boolean,
      default: false
    },

    // Forgot password fields
    resetToken: String,
    resetTokenExpires: Date

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
