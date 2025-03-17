import Joi from "joi";

// 🔹 Email Validation Regex (Strict)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 🔹 Strong Password Regex: Min 8 chars, 1 uppercase, 1 lowercase, 1 digit
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// ✅ Signup Schema
export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Name must be at least 3 characters.",
    "string.max": "Name cannot exceed 30 characters.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().pattern(emailRegex).min(6).max(60).required().messages({
    "string.pattern.base": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().pattern(strongPasswordRegex).required().messages({
    "string.pattern.base":
      "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.",
    "any.required": "Password is required.",
  }),
});


// ✅ Accept Forgot Password Code Schema
export const acceptFPCodeSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).min(6).max(60).required().messages({
    "string.pattern.base": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  code: Joi.alternatives()
    .try(Joi.number(), Joi.string())
    .required()
    .messages({
      "any.required": "Reset code is required.",
    }),
  newPassword: Joi.string().pattern(strongPasswordRegex).required().messages({
    "string.pattern.base":
      "New password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.",
    "any.required": "New password is required.",
  }),
});


