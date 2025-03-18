
// import bcrypt from "bcryptjs";
// import { User } from "../models/user.model.js";
// import { generateToken } from "../utils/generateToken.js";
// import transport from "../Middleware/sendMail.js";
// import { signupSchema } from "../Middleware/validator.js";

// import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";


//  // ✅ Register Function
// export const register = async (req, res) => {


//  // Validate input
//   const { error } = signupSchema.validate(req.body);
//   if (error) return sendResponse(res, 400, false, error.details[0].message);

//   const { name, email, password } = req.body;

//   try {
//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) return sendResponse(res, 400, false, "Email already exists!");

//     // Ensure password is provided before hashing
//     if (!password) {
//       return sendResponse(res, 400, false, "Password is required.");
//     }

//     // Hash the password before storing
//     const hashedPassword = await bcrypt.hash(password, 12);
//     console.log("Hashed password:", hashedPassword); // Debugging

//     // Create new user
//     user = new User({
//       name,
//       email,
//       password: hashedPassword, // Ensure password is stored
//       isVerified: false,
//     });

//     await user.save();
//     console.log("New user created:", user); // Debugging

//     // ✅ Send Email (Only Success Message)
//     await transport.sendMail({
//       from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
//       to: email,
//       subject: "Welcome to Our Platform!",
//       text: "Registration successful!",
//     });

//     return sendResponse(
//       res,
//       200,
//       true,
//       "Registration successful!"
//     );
//   } catch (err) {
//     console.error("Registration Error:", err);
//     return sendResponse(res, 500, false, "Server error. Please try again.");
//   }

// }

// export const login = async (req, res) => {
//   try {
 

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required.",
//       });
//     }

//     const user = await User.findOne({ email }).select("+password");

//     console.log("User found:", user); // Debugging

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect email or password",
//       });
//     }

//     if (!user.password) {
//       console.error("Error: User password is undefined in DB.");
//       return res.status(500).json({
//         success: false,
//         message: "Server error. Please try again.",
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect email or password",
//       });
//     }

//     // ✅ Generate token and send response
//     return generateToken(res, user, `Welcome back ${user.name}`);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to login",
//     });
//   }
// };

// export const GoogleLogin = async (req, res, next) => {
//   try {
//     const { name, email, avatar } = req.body;

//     let user = await User.findOne({ email });

//     if (!user) {
//       const randomPassword = Math.random().toString(36).slice(-8);
//       const hashedPassword = await bcrypt.hash(randomPassword, 10);

//       user = new User({
//         name,
//         email,
//         avatar,
//         password: hashedPassword,
//       });

//       await user.save();
//     }

//     const token = jwt.sign(
//       {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Google login successful",
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//       },
//     });
//   } catch (error) {
//     console.error("Google Login Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Please try again.",
//     });
//   }
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ✅ Missing import added
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import transport from "../Middleware/sendMail.js";
import { signupSchema } from "../Middleware/validator.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

// ✅ Register Function
export const register = async (req, res) => {
  // Validate input
  const { error } = signupSchema.validate(req.body);
  if (error) return sendResponse(res, 400, false, error.details[0].message);

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return sendResponse(res, 400, false, "Email already exists!");

    // Ensure password is provided before hashing
    if (!password) {
      return sendResponse(res, 400, false, "Password is required.");
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed password:", hashedPassword); // Debugging

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword, // Ensure password is stored
      isVerified: false,
    });

    await user.save();
    console.log("New user created:", user); // Debugging

    // ✅ Send Email (Only Success Message)
    await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: email,
      subject: "Welcome to Our Platform!",
      text: "Registration successful!",
    });

    return sendResponse(res, 200, true, "Registration successful!");
  } catch (err) {
    console.error("Registration Error:", err);
    return sendResponse(res, 500, false, "Server error. Please try again.");
  }
};

// ✅ Login Function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    console.log("User found:", user); // Debugging

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    if (!user.password) {
      console.error("Error: User password is undefined in DB.");
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // ✅ Generate token and send response
    return generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const GoogleLogin = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Generate a random password since Google login does not provide one
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new User({
        name,
        email,
        avatar: avatar || "", // Default empty string if no avatar
        password: hashedPassword,
      });

      await user.save();
    }

    // ✅ Generate Token (Using Utility Function)
    generateToken(res, user, "Google login successful");
  } catch (error) {
    console.error("Google Login Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Try again." });
  }
};

  


/** 🚪 LOGOUT */
export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

const sendResponse = (res, statusCode, success, message) => {
  return res.status(statusCode).json({ success, message });
};




// Function to verify forgot password code
const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendForgotPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return sendResponse(res, 400, false, "Email is required!");
    }

    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return sendResponse(res, 404, false, "User does not exist!");
    }

    // Generate and hash the reset code
    const resetCode = generateVerificationCode();
    const hashedCode = await bcrypt.hash(resetCode, 12);

    user.forgotPasswordCode = hashedCode;
    user.forgotPasswordCodeValidation = Date.now();
    await user.save();

  
    // Send email with reset code
    await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: user.email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${resetCode}`,
    });

    return sendResponse(res, 200, true, "Reset code sent to your email.");
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return sendResponse(res, 500, false, "Failed to send reset code.");
  }
};


export const verifyForgotPasswordCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return sendResponse(res, 400, false, "Email and Forget code are required!");
    }

    const user = await User.findOne({ email }).select("+forgotPasswordCode +forgotPasswordCodeValidation");

    if (!user) {
      return sendResponse(res, 404, false, "User does not exist!");
    }

    // Check if code is expired (valid for 5 minutes)
    if (!user.forgotPasswordCode || !user.forgotPasswordCodeValidation || Date.now() - user.forgotPasswordCodeValidation > 5 * 60 * 1000) {
      return sendResponse(res, 400, false, "Forget code has expired!");
    }

    // Compare the provided code with the hashed code
    const isCodeValid = await bcrypt.compare(code.toString(), user.forgotPasswordCode);

    if (!isCodeValid) {
      return sendResponse(res, 400, false, "Invalid Forget code!");
    }

    return sendResponse(res, 200, true, "Forget code verified successfully");
  } catch (error) {
    console.error("Verify Reset Code Error:", error);
    return sendResponse(res, 500, false, "Failed to verify reset code.");
  }
};

export const setNewPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate input
    if (!email || !newPassword) {
      return sendResponse(
        res,
        400,
        false,
        "Email and new password are required!"
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, 404, false, "User not found!");
    }

    // Hash the new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;

    // Clear reset code fields
    user.forgotPasswordCode = undefined;
    user.forgotPasswordCodeValidation = undefined;

    await user.save();

    return sendResponse(
      res,
      200,
      true,
      "Password has been updated successfully!"
    );
  } catch (error) {
    console.error("Set New Password Error:", error.message || error);
    return sendResponse(
      res,
      500,
      false,
      `Failed to update password: ${error.message || "Unknown error"}`
    );
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // extract public id of the old image from the url is it exists;
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
      deleteMediaFromCloudinary(publicId);
    }

    // upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id; // Extract user ID from authentication middleware

    // Find user by ID
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve profile" });
  }
};
