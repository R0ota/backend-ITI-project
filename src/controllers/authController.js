const User = require("../models/userModel");
// const sendEmail=require("../utils/sendEmail")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const sendEmail = require("../utils/sendEmail");
const AppError = require("../utils/appError");

const signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "user",
    });
    await user.save();

    // Generate token for the newly created user
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // Return user object and token
    res.send({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.send({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `http://localhost:${process.env.PORT}/resetpassword?token=${token}`;
  try {
    await sendEmail(user.email, resetLink);
  } catch (err) {
    return res.status(500).json({
      message: "Error sending email",
      error: err,
    });
  }

  res.json({ message: "Password reset link sent" });
};

const verifyToken = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    res.json({ valid: true });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

const checkOldPassword = async (req, res, next) => {
  try {
    const { oldPassword } = req.body;
    const user = await User.findById(req.user._id);
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new AppError("Invalid password", 400);
    }
    res.status(200).json({
      message: "Old password is valid",
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new AppError("Invalid password", 400);
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  forgetPassword,
  verifyToken,
  resetPassword,
  login,
  signup,
  checkOldPassword,
  changePassword,
};
