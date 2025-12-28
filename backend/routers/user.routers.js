const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const auth = require("../middleware/auth.js");

router.post("/login", userController.userLogin);

// protected route to test token
router.get("/me", auth, userController.me);

module.exports = router;
