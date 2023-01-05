const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 32,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
