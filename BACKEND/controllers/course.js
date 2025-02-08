const Course = require("../models/course");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Required" });
    }

    const courseData = {
      title,
      description,
      price,
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
