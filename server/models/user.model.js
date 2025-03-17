import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [3, "The minimum length should be 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      unique: true,
      minlength: [5, "Email must have at least 5 characters!"],
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password must be provided"],
      select: false, // Don't include password in responses by default
    },

    verificationCode: {
      type: String,
      select: false, // Don't expose verification code by default
    },

    forgotPasswordCode: {
      type: String,
      select: false, // Ensure it is not excluded from queries
    },
    forgotPasswordCodeValidation: {
      type: Date,
      select: false,
    },

    role: {
      type: String,
      enum: ["instructor", "student"], // Allowed roles
      default: "student", // Default role is student
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Referring to the Course model
      },
    ],
    photoUrl: {
      type: String,
      default: null, // Default value for profile photo URL
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Exporting the User model
export const User = mongoose.model("User", userSchema);
