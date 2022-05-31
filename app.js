const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

require("dotenv").config();

const app = express();

// CORS Fix
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

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
  res.send("Health check !");
});

app.listen(5001, () => console.log("Server started serving !"));
