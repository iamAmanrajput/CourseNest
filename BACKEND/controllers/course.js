const Course = require("../models/course");
const cloudinary = require("cloudinary").v2;
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Purchase = require("../models/purchase");
const User = require("../models/user");
const Order = require("../models/order");
const Razorpay = require("razorpay");
require("dotenv").config();
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//create course
exports.createCourse = async (req, res) => {
  try {
    const { adminId } = req;
    const { title, description, price } = req.body;
    const { image } = req.files;
    if (!title || !description || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Required" });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files Upload" });
    }
    const courseImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );

    const courseData = {
      title,
      description,
      price: Number(price),
      image: {
        public_id: courseImage.public_id,
        url: courseImage.secure_url,
      },
      creatorId: adminId,
    };
    const course = await Course.create(courseData);
    return res
      .status(201)
      .json({ success: true, message: "Course Created Successfully", course });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Creating Order",
    });
  }
};

//update course
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { adminId } = req;
    const course = await Course.findOne({ _id: courseId, creatorId: adminId });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "You are not owner of this course" });
    }

    const updatedCourseDetails = {
      title: req.body.title || course.title,
      description: req.body.description || course.description,
      price:
        req.body.price !== undefined ? Number(req.body.price) : course.price,
    };

    if (req.files && req.files.image) {
      const newImage = req.files.image;
      if (course.image && course.image.public_id) {
        await cloudinary.uploader.destroy(course.image.public_id);
      }

      const uploadedImage = await uploadImageToCloudinary(
        newImage,
        process.env.FOLDER_NAME
      );
      updatedCourseDetails.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedCourseDetails,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Updating Course",
    });
  }
};

//delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { adminId } = req;
    const { courseId } = req.params;
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "You are not the owner of this cousre",
      });
    }

    if (course.image && course.image.public_id) {
      await cloudinary.uploader.destroy(course.image.public_id);
    }

    return res
      .status(200)
      .json({ success: true, message: "Course Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Deleting Course",
    });
  }
};

//get courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate("creatorId");

    if (courses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Courses Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Courses Fetched Successfully",
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching Courses",
    });
  }
};

//get single course
exports.courseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("creatorId");

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course Fetched Successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching Course",
    });
  }
};

// Buy Course
exports.buyCourses = async (req, res) => {
  try {
    const { userId } = req;
    const { courseId } = req.params;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course Not Found" });
    }

    // Check if the user already purchased the course
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({
        success: false,
        message: "User Already Purchased this Course",
      });
    }

    // Create Razorpay Order
    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `receipt_order_1`,
    };

    const order = await razorpayInstance.orders.create(options);

    // Send order details to frontend
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while buying the course",
      error: error.message,
    });
  }
};

//verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const { userId } = req;
    const { courseId } = req.params;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    // Create HMAC object
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    // Compare generated signature with received signature
    if (generatedSignature === razorpay_signature) {
      // Store purchase details after successful payment verification
      const newPurchase = await Purchase.create({ userId, courseId });
      const orderDetail = await Order.create({
        email: user.email,
        userId,
        courseId,
        paymentId: razorpay_payment_id,
        amount: course.price,
        status: "Success",
      });

      return res.status(200).json({
        success: true,
        message: "Payment Verified Successfully",
        purchase: newPurchase,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during payment verification",
      error: error.message,
    });
  }
};
