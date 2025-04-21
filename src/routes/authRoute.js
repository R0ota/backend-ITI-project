const express = require("express");
const router = express.Router();

const {
  forgetPassword,
  verifyToken,
  resetPassword,
  login,
  signup,
  changePassword,
  checkOldPassword,
} = require("../controllers/authController");
const joiMiddleWare = require("../middleware/joiMiddleware");
const {
  changePasswordSchema,
  checkOldPasswordShcema,
} = require("../validations/authValidation");
const { authMiddleware } = require("../middleware/authentication");

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgetpassword", forgetPassword);

router.get("/verifytoken", verifyToken);

router.post("/resetpassword", resetPassword);

router.post(
  "/check-old-password",
  authMiddleware,
  joiMiddleWare(checkOldPasswordShcema),
  checkOldPassword
);

router.patch(
  "/change-password",
  authMiddleware,
  joiMiddleWare(changePasswordSchema),
  changePassword
);

module.exports = router;
