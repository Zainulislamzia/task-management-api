const express = require("express");
const { authController } = require("../controllers");
const validateRequest = require("../validators");
const { loginSchema, registerSchema } = require("../validators/authValidator");

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema, "body"),
  authController.register
);

router.post(
  "/login",
  validateRequest(loginSchema, "body"),
  authController.login
);

module.exports = router;
