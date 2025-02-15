import express from "express";
import upload from "../utils/Multer.js";
import isAuthenticated from "../Middleware/isAuthenticated.js";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorCourses,
  getLectureById,
  removeLecture,
} from "../controllers/course.controller.js";

const router = express.Router();

// 📌 Course Routes
router
  .route("/")
  .post(isAuthenticated, createCourse) // Create a course
  .get(isAuthenticated, getCreatorCourses); // Get courses by creator

router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse) // Edit course
  .get(isAuthenticated, getCourseById); // Get course details

// 📌 Lecture Routes
router
  .route("/:courseId/lecture")
  .post(isAuthenticated, createLecture) // Add a lecture
  .get(isAuthenticated, getCourseLecture); // Get all lectures in a course

router.route("/:courseId/lecture/:lectureId").put(isAuthenticated, editLecture); // ✅ Fixed: Edit a lecture

router
  .route("/lecture/:lectureId")
  .delete(isAuthenticated, removeLecture) // ✅ Fixed: Remove a lecture
  .get(isAuthenticated, getLectureById); // ✅ Fixed: Get a single lecture

export default router;
