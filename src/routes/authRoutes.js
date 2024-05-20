const express = require("express");
const { signUpMiddleware, loginMiddleware, getUserDetailsMiddleware } = require("../middlewares/authMiddleware");
const { signupController, loginController, getUserDetailsController } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUpMiddleware, signupController);
router.post("/login", loginMiddleware, loginController);
router.get("/get", getUserDetailsMiddleware, getUserDetailsController)

module.exports = router;
