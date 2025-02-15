import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    videoInfo: {
      videoUrl: { type: String, required: true }, // ✅ Fix: Use `videoUrl` as a string
      publicId: { type: String },
      isPreviewFree: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);
