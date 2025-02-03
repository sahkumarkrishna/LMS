import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;

    // Validate request body
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category are required.",
      });
    }

    // Create a new course
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id, // Assuming `req.id` is correctly set as the authenticated user's ID
    });

    return res.status(201).json({
      course,
      message: "Course created successfully.",
    });
  } catch (error) {
    console.error("Error creating course:", error.message); // Log error for debugging
    return res.status(500).json({
      message: "Failed to create course.",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id; // Assuming `req.id` is correctly set as the authenticated user's ID

    // Fetch courses by creator ID
    const courses = await Course.find({ creator: userId });

    // If no courses are found, return an empty array with a message
    if (!courses || courses.length === 0) {
      return res.status(404).json({
        courses: [],
        message: "No courses found for this creator.",
      });
    }

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error.message); // Log error for debugging
    return res.status(500).json({
      message: "Failed to fetch courses.",
    });
  }
};
