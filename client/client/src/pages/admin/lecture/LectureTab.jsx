import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation } from "@/Features/api/courseApi"; // ✅ Corrected import
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState(""); // ✅ Use camelCase for consistency
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const { courseId, lectureId } = useParams(); // ✅ Correctly extracting courseId & lectureId
  const [editLecture, { isLoading, error, isSuccess, data }] =
    useEditLectureMutation(); // ✅ Correct mutation hook

  const fileChangeHandle = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);

      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id, // ✅ Ensure this matches backend response
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error("Video upload failed:", error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    if (!uploadVideoInfo) {
      toast.error("Please upload a video before updating the lecture.");
      return;
    }

    await editLecture({
      lectureTitle, // ✅ Fixed key names
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully!");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update lecture.");
    }
  }, [isSuccess, error, data]); // ✅ Correct dependency array

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-red-800 text-white" variant="destructive">
            Remove Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Ex. Introduction to JavaScript"
            value={lectureTitle} // ✅ Corrected state variable
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandle}
            placeholder="Upload video"
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="free-video"
            checked={isFree}
            onCheckedChange={setIsFree}
          />
          <Label htmlFor="free-video">Is this video Free</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button
            disabled={btnDisable || isLoading}
            onClick={editLectureHandler}
          >
            {isLoading ? "Updating..." : "Update Lecture"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
