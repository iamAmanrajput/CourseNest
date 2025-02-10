const express = require("express");
const { signup, login, logout, purchases } = require("../controllers/user");
const { isLoggedin } = require("../middlewares/auth");
const router = express.Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/purchases").get(isLoggedin, purchases);

module.exports = router;
