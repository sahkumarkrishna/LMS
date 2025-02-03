import express from "express";
import {
  register,
  login,
  getUserProfile,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../Middleware/isAuthenticated.js";
import upload from "../utils/Multer.js"; // Assuming 'upload' is your file handling middleware

const router = express.Router();

// User registration and login routes
router.route("/register").post(register);
router.route("/login").post(login);

// Logout route
router.route("/logout").get(logout);

// Profile routes
router.route("/profile").get(isAuthenticated, getUserProfile);

// Update profile route with file upload
router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePhoto"), updateProfile); // Assuming 'profilePhoto' is the field name for the file

export default router;
