const Logo = require("../models/logo");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getLogoById = (req, res, next, id) => {
  Logo.findById(id)
    .populate("category")
    .exec((err, logo) => {
      if (err) {
        return res.status(400).json({
          error: "Logo not found",
        });
      }
      req.logo = logo;
      next();
    });
};

exports.createLogo = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let logo = new Logo(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      logo.photo.data = fs.readFileSync(file.photo.path);
      logo.photo.contentType = file.photo.type;
    }
    // console.log(logo);

    //save to the DB
    logo.save((err, logo) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed",
        });
      }
      res.json(logo);
    });
  });
};

exports.getLogo = (req, res) => {
  req.logo.photo = undefined;
  return res.json(req.logo);
};

//middleware
exports.photo = (req, res, next) => {
  if (req.logo.photo.data) {
    res.set("Content-Type", req.logo.photo.contentType);
    return res.send(req.logo.photo.data);
  }
  next();
};

// delete controllers
exports.deleteLogo = (req, res) => {
  let logo = req.logo;
  logo.remove((err, deletedLogo) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the logo",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedLogo,
    });
  });
};

// delete controllers
exports.updateLogo = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //updation code
    let logo = req.logo;
    logo = _.extend(logo, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      logo.photo.data = fs.readFileSync(file.photo.path);
      logo.photo.contentType = file.photo.type;
    }
    // console.log(logo);

    //save to the DB
    logo.save((err, logo) => {
      if (err) {
        res.status(400).json({
          error: "Updation of logo failed",
        });
      }
      res.json(logo);
    });
  });
};

//logo listing

exports.getAllLogos = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Logo.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, logos) => {
      if (err) {
        return res.status(400).json({
          error: "NO logo FOUND",
        });
      }
      res.json(logos);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Logo.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NO category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.logos.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Logo.bulkWrite(myOperations, {}, (err, logos) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
