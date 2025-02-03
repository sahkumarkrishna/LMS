import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
     
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["instructor", "student"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Refers to the "Course" collection
      },
    ],
    photoUrl: {
      type: String,
      default: " ", // Default photo URL
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const User = mongoose.model("User", userSchema);
