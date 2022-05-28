var mongoose = require("mongoose");

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

const tailorSchema = new mongoose.Schema({
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
  prevVisits: {
    type: [customerSchema],
    default: [],
  },
  scheduledVisits: {
    type: [customerSchema],
    default: [],
  },
});

module.exports = mongoose.model("Tailor", tailorSchema);
