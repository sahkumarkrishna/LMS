
import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
  getUserProfile,
  // sendForgotPasswordCode,
  // verifyForgotPasswordCode,
  // getUserProfile,
  // setNewPassword,
  GoogleLogin,

  
} from "../controllers/user.controller.js"; // Ensure the function is exported from the controller
import isAuthenticated from "../Middleware/isAuthenticated.js";
import upload from "../utils/Multer.js"; // Ensure multer setup is correct

const router = express.Router();

// User registration & login
router.post("/register", register);
router.post("/login", login);
router.post("/google-login", GoogleLogin);

// Logout
router.get("/logout", logout);

// Get user profile (protected)
router.get("/profile", isAuthenticated, getUserProfile);

// Update profile with file upload (protected)
router.put(
  "/profile/update",
  isAuthenticated,
  upload.single("profilePhoto"),
  updateProfile
);

// Reset password route (protected)
// router.post("/set-password", setNewPassword);


// // Send forgot password code
// router.post("/send-forgot-password-code", sendForgotPasswordCode);

// // Verify forgot password code
// router.post("/verify-forgot-password-code", verifyForgotPasswordCode);

export default router;
