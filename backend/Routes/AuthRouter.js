const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../Controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../Schema/AuthValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

//
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
