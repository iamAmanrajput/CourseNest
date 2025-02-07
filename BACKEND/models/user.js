const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    union: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports.User = mongoose.model("User", userSchema);
