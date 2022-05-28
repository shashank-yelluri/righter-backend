const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate token
const { expressjwt } = require("express-jwt"); // for authorization check

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: "Email already taken !" });
    }
    res.json({ user });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please Check !",
      });
    }

    // Have this method in virtual methods in model/user.js ..
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match",
      });
    }

    // creating a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // creating a cookie
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "User signed out successfully !" });
};

exports.requireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(req.profile);
  console.log(req.auth);
  if (!user) {
    return res.status(403).json({
      error: "Access Denied !",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource, Access Denied !",
    });
  }

  next();
};
