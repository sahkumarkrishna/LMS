import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseByIdQuery,
} from "@/Features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [LectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  console.log("course Id is", courseId);

  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  console.log("created lecture is ", data);

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseByIdQuery(courseId);

  const createLectureHandler = async () => {
    const payload = {
      lectureTitle: LectureTitle,
      courseId,
    };

    await createLecture(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success(data?.message || "Lecture created successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to create lecture");
    }
  }, [isSuccess, error, data]);

  return (
    <div className="flex-1 mx-10 my-5">
      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-2">
          Let's add a lecture and some basic details for your new lecture!
        </h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
          consequatur commodi doloremque non delectus tempore hic iure
          voluptatibus velit in. Veniam praesentium quos dignissimos labore
          architecto et fuga explicabo minima.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={LectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter the title of your lecture"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-black text-white"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button
            className="bg-black text-white"
            disabled={isLoading}
            onClick={createLectureHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>

        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading course data...</p>
          ) : lectureError ? (
            <p>Failed to load course data</p>
          ) : lectureData?.course?.lectures?.length === 0 ? (
            <p>No lectures available</p>
          ) : (
            lectureData?.course?.lectures?.map((lecture, index) => {
              console.log("lect ", lecture);
              return (
                <Lecture
                  key={lecture?._id}
                  courseId={courseId}
                  index={index}
                  lecture={lecture}
                  
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
