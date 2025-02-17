const Order = require("../models/order");

exports.getOrderDetails = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("userId").populate("courseId");
    res
      .status(200)
      .json({ success: true, message: "Course Fetched Successfully", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
