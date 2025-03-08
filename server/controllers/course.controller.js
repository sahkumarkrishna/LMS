import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

// 📌 CREATE COURSE
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res
        .status(400)
        .json({ message: "Course title and category are required." });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res
      .status(201)
      .json({ course, message: "Course created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create course." });
  }
};

export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No published courses found" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error in getPublishedCourse:", error); // ✅ Log the error
    return res
      .status(500)
      .json({ message: "Failed to get published courses", error });
  }
};

// 📌 GET COURSES BY CREATOR
export const getCreatorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.id });
    return res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve courses." });
  }
};

// 📌 EDIT COURSE
export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    let {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    // Convert "null" string to null or ensure coursePrice is a number
    coursePrice = coursePrice === "null" ? null : Number(coursePrice);

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    course = await Course.findByIdAndUpdate(
      courseId,
      {
        courseTitle,
        subTitle,
        description,
        category,
        courseLevel,
        coursePrice,
        courseThumbnail: courseThumbnail?.secure_url,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ course, message: "Course updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update course." });
  }
};

// 📌 GET COURSE BY ID
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    return res.status(200).json({ course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get course by ID." });
  }
};

// 📌 CREATE LECTURE
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "Lecture title is required." });
    }

    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res
      .status(201)
      .json({ lecture, message: "Lecture created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create lecture." });
  }
};

// 📌 GET ALL LECTURES OF A COURSE
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    return res.status(200).json({ lectures: course.lectures });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get lectures." });
  }
};

// 📌 EDIT LECTURE
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found!" });
    }

    if (!lecture.videoInfo) {
      lecture.videoInfo = {};
    }

    if (videoInfo?.videoUrl) {
      lecture.videoInfo.videoUrl = videoInfo.videoUrl;
    } else if (!lecture.videoInfo.videoUrl) {
      return res.status(400).json({ message: "Video URL is required." });
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.publicId) lecture.videoInfo.publicId = videoInfo.publicId;
    if (typeof isPreviewFree === "boolean")
      lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res
      .status(200)
      .json({ lecture, message: "Lecture updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to edit lecture." });
  }
};

// 📌 REMOVE LECTURE
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found!" });
    }

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({ message: "Lecture removed successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to remove lecture." });
  }
};

// 📌 GET LECTURE BY ID
export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found!" });
    }
    return res.status(200).json({ lecture });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get lecture by ID." });
  }
};

// public unpublish course logic

export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query; // true, false
  
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    // publish status based on the query paramter
    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
    });
  }
};
