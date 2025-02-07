const express = require("express");
const router = express.Router();

const { createCourse } = require("../controllers/course");

router.route("/create").post(createCourse);

module.exports = router;
