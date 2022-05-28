const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({
        error: "User not Found",
      });
    }
    console.log(user);
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.json(req.profile);
};

exports.update = (req, res) => {
  const { customerName, measurments } = req.body;

  User.updateOne(
    { _id: req.profile._id, "scheduledVisits._id": customerName },
    { $set: { "scheduledVisits.$.measurments": measurments } },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to set measurments",
        });
      }
      res.json({ data });
    }
  );
};
