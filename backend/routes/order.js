const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  getOrdersOfUser,
} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual routes
//create
router.post(
  "/order/create/",
  isSignedIn,
  isAuthenticated,

  createOrder
);
//read
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get("/order/:userId", isSignedIn, isAuthenticated, getOrdersOfUser);

//status of order
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
