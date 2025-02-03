import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.router.js";
dotenv.config({});

//call database connection here
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

//defult middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Hello i am coming from backend",
  });
});

app.listen(PORT, () => {
  console.log(`server listen at port ${PORT}`);
});
