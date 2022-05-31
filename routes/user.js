var express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { read, update, userById } = require("../controllers/user");

// requireSignIn, isAuth,
router.get("/user/:userId", read);
router.post("/user/:userId", update);

router.param("userId", userById);

module.exports = router;
