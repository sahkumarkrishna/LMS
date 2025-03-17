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



