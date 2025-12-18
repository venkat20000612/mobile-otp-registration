require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const registeruser = require("./routes/registeruser");
const Sendotp = require("./routes/sendOtp");
const Verifyotp = require("./routes/verifyOtp");
const resendOtp = require("./routes/resendOtp");
const loginRouter = require("./routes/login");
const forgotPassword = require("./routes/forgotPassword");
const resetPassword = require("./routes/resetPassword");

const connectDB = require("./config/db");
connectDB();

var app = express();

// MIDDLEWARES (ORDER IMPORTANT)
app.use(logger("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://astounding-brigadeiros-490b31.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// preflight
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/register", registeruser);
app.use("/sendotp", Sendotp);
app.use("/verifyotp", Verifyotp);
app.use("/otp", resendOtp);
app.use("/login", loginRouter);
app.use("/forgotpassword", forgotPassword);
app.use("/reset-password", resetPassword);

module.exports = app;
