const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

exports.signup = async (req, res) => {
  try {
    const adminSchema = z.object({
      firstName: z
        .string()
        .min(3, { message: "First name must be at least 3 characters long" }),
      lastName: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters long" }),
      email: z.string().email({ message: "Invalid email format" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    });

    const validatedData = adminSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: validatedData.error.issues.map((err) => err.message),
      });
    }

    const { firstName, lastName, email, password } = validatedData.data;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, message: "Signup Successful", admin });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Signing Up",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const adminSchema = z.object({
      email: z.string().email({ message: "Invalid email format" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    });

    const validatedData = adminSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: validatedData.error.issues.map((err) => err.message),
      });
    }

    const { email, password } = validatedData.data;

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      // Fixed the typo (was `user`)
      return res
        .status(404)
        .json({ success: false, message: "User not registered" });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const payload = { id: admin._id };
    const token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res.cookie("jwt", token, cookieOptions).status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      admin,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
      error: error.message, // Added actual error message for debugging
    });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in logout",
    });
  }
};
