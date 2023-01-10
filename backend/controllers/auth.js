const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { name, email, number, password } = req.body;
  if (!email || !password || !name || !number) {
    return res.status(422).json({ error: "Please enter all fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exists with this email" });
    }
    bcrypt.hash(password, 12).then((hashedpassword) => {
      const user = new User({
        email,
        password: hashedpassword,
        name,
        number,
      });

      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            err: "NOT able to register",
          });
        }
        res.json({
          name: user.name,
          email: user.email,
          id: user._id,
        });
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Email doesn't exsist" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //create token
          const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET);
          //put token in cookie
          res.cookie("token", token, { expire: new Date() + 9999 });
          const { _id, name, email, role } = savedUser;
          //send response to front end
          return res.json({ token, user: { _id, name, email, role } });
        } else {
          return res.status(422).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};

exports.isSuperAdmin = (req, res, next) => {
  if (req.profile.role === 2) {
    return res.status(403).json({
      error: "You are not SUPER ADMIN, Access denied",
    });
  }
  next();
};
