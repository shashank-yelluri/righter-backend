var mongoose = require("mongoose");
var crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const measurmentsSchema = new mongoose.Schema({
  chest: {
    type: String,
  },
  shoulder: {
    type: String,
  },
  cuffs: {
    type: String,
  },
  neck: {
    type: String,
  },
});

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  measurments: {
    type: measurmentsSchema,
    default: null,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    location: {
      type: String,
    },
    mobile: {
      type: String,
    },
    prevVisits: {
      type: [customerSchema],
      default: [],
    },
    scheduledVisits: {
      type: [customerSchema],
      default: [],
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

// Virtual Fields ..
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//Virtual Methods ..
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
