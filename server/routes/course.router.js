import express from "express";
import upload from "../utils/Multer.js";
import isAuthenticated from "../Middleware/isAuthenticated.js";
import {
  createCourse,
  editCourse, // ✅ Use lowercase 'e' to match the export in controller
  getCreatorCourses,
} from "../controllers/course.controller.js";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, createCourse)
  .get(isAuthenticated, getCreatorCourses);

router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);

export default router;

