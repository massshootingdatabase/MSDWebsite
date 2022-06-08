const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
  privilege,
  giveprivilege,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/privilege").get(privilege);

router.route("/giveprivilege").post(giveprivilege);

module.exports = router;
