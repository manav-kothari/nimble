const express = require("express");
const router = express.Router();

const {
  getLogoById,
  createLogo,
  getLogo,
  updateLogo,
  deleteLogo,
  getAllLogos,
  getAllUniqueCategories,
} = require("../controllers/logo");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("logoId", getLogoById);

//all of actual routes
//create route
router.post("/logo/create/:userId", isSignedIn, isAuthenticated, createLogo);

// read routes
router.get("/logo/:logoId", getLogo);

//delete route
router.delete("/logo/:logoId/:userId", isSignedIn, isAuthenticated, deleteLogo);

//update route
router.put("/logo/:logoId/:userId", isSignedIn, isAuthenticated, updateLogo);

//listing route
router.get("/logos", getAllLogos);

router.get("/logos/categories", getAllUniqueCategories);

module.exports = router;
