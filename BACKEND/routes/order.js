const express = require("express");
const { getOrderDetails } = require("../controllers/order.js");
const { isAdminLoggedin } = require("../middlewares/admin.js");

const router = express.Router();

router.route("/").get(isAdminLoggedin, getOrderDetails);

module.exports = router;
