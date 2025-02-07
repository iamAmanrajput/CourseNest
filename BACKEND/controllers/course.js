const Course = require("../models/course");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Required" });
    }
  } catch (error) {}
};
