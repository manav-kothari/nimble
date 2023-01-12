const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    userId: {
      type: String,
      required: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carousel", carouselSchema);
