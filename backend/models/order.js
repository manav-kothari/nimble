const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
date = new Date();
timeZone = "Asia/Kolkata";

timestamp = date.toLocaleString("en-US", { timeZone });

// var moment = require("moment");
// var time = moment().utcOffset("+05:30").format("DD-MM-YY, h:mm:ss a");

// const ProductCartSchema = new mongoose.Schema({
//   product: {
//     type: ObjectId,
//     ref: "Product",
//   },
//   name: String,
//   // count: Number,
//   price: Number,
// });

// const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    orderedItems: [],
    // products: [ProductCartSchema],
    // transaction_id: {},
    amount: { type: Number },
    number: { type: Number },
    name: { type: String },
    mobileNumber: { type: Number },
    tableNumber: { type: String },
    instruction: { type: String, maxlength: 2000 },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Recieved",
    },

    //   user: {
    //     type: ObjectId,
    //     ref: "User",
    //   },
    updated: Date,
    timestamp: {
      type: String,
      default: timestamp,
    },
  }
  // { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
