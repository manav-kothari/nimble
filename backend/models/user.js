var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: {
      type: Array,
      default: [],
    },
    resetToken: String,
    expireToken: Date,
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
