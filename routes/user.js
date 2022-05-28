var express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { read, update, userById } = require("../controllers/user");

router.get("/user/:userId", requireSignIn, isAuth, read);
router.post("/user/:userId", requireSignIn, isAuth, update);

router.param("userId", userById);

module.exports = router;
