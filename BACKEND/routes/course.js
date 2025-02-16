const express = require("express");
const router = express.Router();

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  courseDetails,
  buyCourses,
  verifyPayment,
} = require("../controllers/course");

const { isLoggedin } = require("../middlewares/auth");
const { isAdminLoggedin } = require("../middlewares/admin");

router.route("/create").post(isAdminLoggedin, createCourse);

router.route("/update/:courseId").put(isAdminLoggedin, updateCourse);

router.route("/delete/:courseId").delete(isAdminLoggedin, deleteCourse);

router.route("/courses").get(getCourses);

router.route("/:courseId").get(courseDetails);

router.route("/buy/:courseId").post(isLoggedin, buyCourses);

router.route("/verify/:courseId").post(isLoggedin, verifyPayment);

module.exports = router;
