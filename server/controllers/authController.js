import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { validateEmailFormat } from "../utils/validation.js";

dotenv.config();

export const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId }).select("address email");
    res.status(200).json({
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed!",
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Failed!",
      message: "Please provide your email and password",
    });
  }

  if (!validateEmailFormat(email)) {
    return res.status(400).json({
      status: "Failed!",
      message: "Invalid email format.",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "Failed!",
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "Failed!",
        message: "Incorrect email or password",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      token: jwtToken,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed!",
      message: error.message,
    });
  }
};

export const signUp = async (req, res) => {
  const { email, password, phoneNumber, address } = req.body;

  if (!email || !password) {
    // || !phoneNumber || !address
    return res.status(400).json({
      status: "Failed!",
      message: "Please provide all required fields.",
    });
  }

  if (!validateEmailFormat(email)) {
    return res.status(400).json({
      status: "Failed!",
      message: "Invalid email format.",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        status: "Failed!",
        message: "User already exists. Please log in.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    res.status(201).json({
      user: { _id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed!",
      message: error.message,
    });
  }
};

export const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Please provide your email.",
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      // service: "gmail",
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested to reset your password.</p>
             <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
             <p>This link will expire in 15 minutes.</p>`,
    });

    res.status(200).json({
      message: "Password reset email sent! Please check your inbox.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyResetPasswordRequest = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      message: "No token provided.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      message: "Token is valid.",
      userId: decoded.id,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired token.",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      message: "Token and new password are required.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.status(200).json({
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired token.",
    });
  }
};
