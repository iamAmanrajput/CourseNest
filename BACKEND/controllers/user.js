const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const Purchase = require("../models/purchase");

exports.signup = async (req, res) => {
  try {
    const userSchema = z.object({
      firstName: z.string().min(3, {
        status: false,
        message: "First name must be at least 3 characters long",
      }),
      lastName: z.string().min(3, {
        status: false,
        message: "Last name must be at least 3 characters long",
      }),
      email: z
        .string()
        .email({ status: false, message: "Invalid email format" }),
      password: z.string().min(6, {
        status: false,
        message: "Password must be at least 6 characters long",
      }),
    });

    const validatedData = userSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: validatedData.error.issues.map((err) => err.message),
      });
    }

    const { firstName, lastName, email, password } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, message: "Signup Successful", user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Signing Up",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const userSchema = z.object({
      email: z
        .string()
        .email({ status: false, message: "Invalid email format" }),
      password: z.string().min(6, {
        status: false,
        message: "Password must be at least 6 characters long",
      }),
    });

    const validatedData = userSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: validatedData.error.issues.map((err) => err.message),
      });
    }

    const { email, password } = validatedData.data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not registered" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ❌ secure: true blocks cookies on localhost
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", // ✅ Fix for localhost
    };

    res.cookie("jwt", token, cookieOptions).status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
      error: error.message,
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

exports.purchases = async (req, res) => {
  try {
    const { userId } = req;

    // Fetch purchases for the user
    const purchases = await Purchase.find({ userId }).populate("courseId"); // Populate course details if needed

    if (purchases.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User has not purchased any courses",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Purchases fetched successfully",
      purchases, // Include the purchases in the response
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching purchased courses",
      error: error.message,
    });
  }
};
