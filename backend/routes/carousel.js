const express = require("express");
const router = express.Router();

const {
  getCarouselById,
  createCarousel,
  getCarousel,
  photo,
  deleteCarousel,
  getAllCarousel,
} = require("../controllers/carousel");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("carouselId", getCarouselById);

//all of actual routes
//create route
router.post(
  "/carousel/create/:userId",
  isSignedIn,
  isAuthenticated,
  createCarousel
);

// read routes
router.get("/carousel/:carouselId", getCarousel);
router.get("/carousel/photo/:carouselId", photo);

//delete route
router.delete(
  "/carousel/:carouselId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteCarousel
);

//listing route
router.get("/carousel", getAllCarousel);

module.exports = router;
