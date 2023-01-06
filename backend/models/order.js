const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var moment = require("moment-timezone");
var time = moment.tz("Asia/Calcutta").format("DD-MM-YY, h:mm:ss a");

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  // count: Number,
  price: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema({
  orderedItems: String,
  products: [ProductCartSchema],
  transaction_id: {},
  amount: { type: Number },
  address: String,
  number: String,
  instruction: { type: String, maxlength: 2000 },
  // status: {
  //   type: String,
  //   default: "Recieved",
  //   enum: ["Cancelled", "Completed", "Shipped", "Preparing", "Recieved"],
  // },
  updated: Date,
  branch: String,

  //   user: {
  //     type: ObjectId,
  //     ref: "User",
  //   },
  timestamp: {
    type: String,
    default: time,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
