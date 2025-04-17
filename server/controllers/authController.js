import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { validateEmailFormat } from "../utils/validation.js";

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
      status: "Failed!",
      message: "Please provide your email.",
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

    res.status(200).json({
      message: "Password reset email sent! Please check your inbox.",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed!",
      message: error.message,
    });
  }
};

export const verifyResetPasswordRequest = async (req, res) => {
  try {
  } catch (error) {}
};

export const resetPassword = async (req, res) => {
  try {
  } catch (error) {}
};
