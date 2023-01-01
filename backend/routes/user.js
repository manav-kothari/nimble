const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  resetPassword,
  getAllUsers,
  getAUser,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/getuser/:userId", getAUser);
router.get("/users", getAllUsers);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.post("/reset-password", resetPassword);

module.exports = router;
