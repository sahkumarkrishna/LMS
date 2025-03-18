import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  try {
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Set the cookie and return the response
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // Prevent client-side JS access
        sameSite: "strict", // Protect against CSRF
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      })
      .json({
        success: true,
        message,
        user,
      });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate token.",
    });
  }
};



// import jwt from "jsonwebtoken";

// export const generateToken = (res, user, message) => {
//   try {
//     if (!process.env.JWT_SECRET) {
//       console.error("Error: JWT_SECRET is missing!");
//       return res
//         .status(500)
//         .json({ success: false, message: "Server error. Try again later." });
//     }

//     // Generate JWT
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d", // Token expires in 1 day
//     });

//     // Set the cookie and return response
//     return res
//       .status(200)
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "strict",
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 24 * 60 * 60 * 1000, // 1 day
//       })
//       .json({
//         success: true,
//         message,
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           avatar: user.avatar,
//         },
//       });
//   } catch (error) {
//     console.error("Error generating token:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Failed to generate token." });
//   }
// };
