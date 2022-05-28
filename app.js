const express = require("express");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken"); // to generate token
const expressjwt = require("express-jwt"); // for authorization check
require("dotenv").config();

const app = express();

const Tailor = require("./models/tailor");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

mongoose
  .connect("mongodb://localhost:27017/righter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected !"));

app.use(express.json());

app.use(authRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World !");
});

app.put("/set-measurments", (req, res) => {
  // const customerId = req.params.id

  Tailor.updateOne(
    { name: "tailor-01", "scheduledVisits.name": "cust-02" },
    { $set: { "scheduledVisits.$.measurments": req.body } },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to set measurments",
        });
      }
      res.json({ data });
    }
  );
});

app.listen(5001, () => console.log("Server started serving !"));
