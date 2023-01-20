const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields
    const { name, price, description, userId } = fields;

    if (!name || !price || !userId) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving product failed!",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// delete controllers
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct,
    });
  });
};

// update controllers
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed",
        });
      }
      res.json(product);
    });
  });
};

//product listing

exports.getAllProducts = asyncHandler(async (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  let sortByOrder = req.query.sortByOrder ? req.query.sortByOrder : "-1";
  const userId = req.query.userId ? req.query.userId : "";
  const categoryId = req.query.categoryId ? req.query.categoryId : "";
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 15;

  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const populatecategory = req.query.categoryId
    ? {
        path: "category",
        match: {
          _id: req.query.categoryId,
        },
      }
    : { path: "category" };

  Product.find({ userId: `${userId}` })
    .select("-photo")
    .populate({ ...populatecategory })
    .sort([[sortBy, sortByOrder]])
    // .limit(pageSize)
    // .skip(pageSize * (page - 1))

    .exec(function (
      err,
      products,
      page = Number(req.query.pageNumber) || 1,
      pages
    ) {
      products = products.filter(function (product) {
        return product.category;
      });

      if (err) {
        return res.status(400).json({
          error: "NO Product FOUND!",
        });
      }
      count = products.length;

      res.json({
        products: products.slice(pageSize * (page - 1), pageSize * page),
        page,
        pages: Math.ceil(count / pageSize),
      });
    });
});

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NO category found!",
      });
    }
    res.json(category);
  });
};
