const express = require("express");
const router = express.Router();

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  courseDetails,
  buyCourses,
} = require("../controllers/course");

const { isLoggedin } = require("../middlewares/auth");

router.route("/create").post(createCourse);

router.route("/update/:courseId").put(updateCourse);

router.route("/delete/:courseId").delete(deleteCourse);

router.route("/courses").get(getCourses);

router.route("/:courseId").get(courseDetails);

router.route("/buy/:courseId").post(isLoggedin, buyCourses);

module.exports = router;
