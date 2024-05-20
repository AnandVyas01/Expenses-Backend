const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const users = mongoose.model("Users", userSchema, "users");
module.exports = users;
