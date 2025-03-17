// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import courseRoute from "./routes/course.router.js";
// import mediaRoute from "./routes/media.router.js";
// import purchaseRoute from "./routes/purchaseCourse.route.js";
// import courseProgressRoute from "./routes/courseProgress.route.js";
// dotenv.config({});

// //call database connection here
// connectDB();
// const app = express();
// const PORT = process.env.PORT || 3000;

// //defult middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// //api
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/purchase", purchaseRoute);
// app.use("/api/v1/progress", courseProgressRoute);

// app.get("/home", (_, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Hello i am coming from backend",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`server listen at port ${PORT}`);
// });





import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.router.js";
import mediaRoute from "./routes/media.router.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
// Import other routes as needed

dotenv.config();

// Call database connection here
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// Default middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust as needed
    credentials: true,
  })
);

// API routes
// //api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Hello, I am coming from the backend",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
