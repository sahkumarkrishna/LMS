import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({});

// Cloudinary configuration
cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

// Function to upload media
export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Automatically detect the type of file (image, video, etc.)
    });
    return uploadResponse; // This will return the upload response which includes the URL and metadata
  } catch (error) {
    console.error("Error uploading media:", error.message);
    throw new Error("Failed to upload media to Cloudinary");
  }
};

// Function to delete media from Cloudinary
export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    const deleteResponse = await cloudinary.uploader.destroy(publicId);
    return deleteResponse;
  } catch (error) {
    console.error("Error deleting media:", error.message);
    throw new Error("Failed to delete media from Cloudinary");
  }
};

// Function to delete a video from Cloudinary
export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    const deleteResponse = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
    return deleteResponse;
  } catch (error) {
    console.error("Error deleting video:", error.message);
    throw new Error("Failed to delete video from Cloudinary");
  }
};
