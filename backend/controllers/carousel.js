const Carousel = require("../models/carousel");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getCarouselById = (req, res, next, id) => {
  Carousel.findById(id).exec((err, carousel) => {
    if (err) {
      return res.status(400).json({
        error: "Carousel image not found!",
      });
    }
    req.carousel = carousel;
    next();
  });
};

exports.createCarousel = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields
    const { name, userId } = fields;

    if (!name) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let carousel = new Carousel(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "Image size is too big! (MAX: 2MB Allowed)",
        });
      }
      carousel.photo.data = fs.readFileSync(file.photo.path);
      carousel.photo.contentType = file.photo.type;
    }
    // console.log(carousel);

    //save to the DB
    carousel.save((err, carousel) => {
      if (err) {
        res.status(400).json({
          error: "Saving Carousel photo failed!",
        });
      }
      res.json(carousel);
    });
  });
};

exports.getCarousel = (req, res) => {
  req.carousel.photo = undefined;
  return res.json(req.carousel);
};

//middleware
exports.photo = (req, res, next) => {
  if (req.carousel.photo.data) {
    res.set("Content-Type", req.carousel.photo.contentType);
    return res.send(req.carousel.photo.data);
  }
  next();
};

// delete controllers
exports.deleteCarousel = (req, res) => {
  let carousel = req.carousel;
  carousel.remove((err, deletedCarousel) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the carousel photo",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedCarousel,
    });
  });
};

//carousel listing

exports.getAllCarousel = (req, res) => {
  Carousel.find()
    .select("-photo")
    .sort({ createdAt: -1 })
    .exec((err, carousel) => {
      if (err) {
        return res.status(400).json({
          error: "NO carousel item found",
        });
      }
      res.json(carousel);
    });
};
