const Course = require("../models/course");
const cloudinary = require("cloudinary").v2;
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//create course
exports.createCourse = async (req, res) => {
  try {
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
    };
    const course = await Course.create(courseData);
    return res
      .status(201)
      .json({ success: true, message: "Course Created Successfully", course });
  } catch (error) {
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
    console.log(courseId);
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course Not Found" });
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
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course Not Found" });
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
    const courses = await Course.find({}).populate("user");

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
    const course = await Course.findById(courseId).populate("user");

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

//buy course

exports.buyCourses = async (req, res) => {
  try {
    const { courseId } = req.params;
  } catch (error) {}
};
