const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const logoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
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

module.exports = mongoose.model("Logo", logoSchema);
