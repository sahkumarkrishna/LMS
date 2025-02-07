import { Course } from "../models/course.model.js";
import { uploadMedia, deleteMediaFromCloudinary } from "../utils/cloudinary.js";

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
      creator: req.id, // Assuming `req.id` is correctly set (from authenticated user)
    });

    return res.status(201).json({
      course,
      message: "Course created successfully.",
    });
  } catch (error) {
    console.error("Error creating course:", error.message);
    return res.status(500).json({
      message: "Failed to create course.",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;

    // Fetch courses by creator ID
    const courses = await Course.find({ creator: userId });

    return res.status(200).json({
      courses,
      message: courses.length
        ? undefined
        : "No courses found for this creator.",
    });
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    return res.status(500).json({
      message: "Failed to fetch courses.",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId; // Retrieve courseId from URL parameters
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const Thumbnail = req.file;

    // Validate courseId
    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required.",
      });
    }

    // Find the course by ID
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    let courseThumbnail;
    if (Thumbnail) {
      // Delete old image if it exists
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId); // Delete old image from Cloudinary
      }

      // Upload the new thumbnail image
      const uploadResult = await uploadMedia(Thumbnail.path);
      courseThumbnail = uploadResult.secure_url; // Get the URL of the uploaded image
    } else {
      courseThumbnail = course.courseThumbnail; // Retain existing thumbnail if no new image
    }

    // Prepare update data
    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail, // Include the new or existing thumbnail
    };

    // Update the course
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error("Error updating course:", error.message);
    return res.status(500).json({
      message: "Failed to update course.",
    });
  }
};
