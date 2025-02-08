const express = require("express");
const router = express.Router();

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  courseDetails,
} = require("../controllers/course");

router.route("/create").post(createCourse);

router.route("/update/:courseId").put(updateCourse);

router.route("/delete/:courseId").delete(deleteCourse);

router.route("/courses").get(getCourses);

router.route("/:courseId").get(courseDetails);

module.exports = router;
