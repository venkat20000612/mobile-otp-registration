const registerValidation = (req, res, next) => {
  const { username, email, mobile, password, confirmPassword } = req.body;

  // Username
  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Please enter username" });
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Please enter your email" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please enter valid email format" });
  }

  // Mobile
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobile || mobile.trim() === "") {
    return res.status(400).json({ message: "Please enter your mobile number" });
  }
  if (!mobileRegex.test(mobile)) {
    return res.status(400).json({ message: "Please enter valid mobile number" });
  }

  // Password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!password || password.trim() === "") {
    return res.status(400).json({ message: "Please enter your password" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be minimum 8 characters, include uppercase, lowercase, number and special character"
    });
  }

  // Confirm Password
  if (!confirmPassword || confirmPassword.trim() === "") {
    return res.status(400).json({ message: "Please confirm your password" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  next();
};

module.exports = registerValidation;
