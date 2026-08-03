import express from "express";
import loginLimitter from "../config/rateLimit.config.js";
import getProfile from "../controller/usercontroller/getProfile.controller.js";
import login from "../controller/usercontroller/login.controller.js";
import register from "../controller/usercontroller/register.controller.js";
import updateProfile from "../controller/usercontroller/updateProfile.controller.js";
import verificationToken from "../middleware/verifyToken.middle.js";
import {
  validateLogin,
  validateRegister,
} from "../validator/auth.validator.js";

const authRoute = express.Router();

authRoute.post("/register", validateRegister, register);
authRoute.post("/login", loginLimitter, validateLogin, login);

// Protected routes
authRoute.get("/profile", verificationToken, getProfile);
authRoute.put("/update", verificationToken, updateProfile);

export default authRoute;