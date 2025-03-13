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
import RichTextEditor from "@/components/ui/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/Features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });

  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const [publishCourse] = usePublishCourseMutation();

  const course = courseByIdData?.course;

  useEffect(() => {
    if (course) {
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: null, // Prevent setting an invalid file reference
      });
    }
  }, [course]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  // Input Change Handler
  const changeEventHandle = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Select Handlers
  const selectCategory = (value) =>
    setInput((prev) => ({ ...prev, category: value }));
  const selectCourseLevel = (value) =>
    setInput((prev) => ({ ...prev, courseLevel: value }));

  // File Selection Handler
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  // Course Update Handler
  const updateCourseHandler = async () => {
    try {
      if (!courseId) throw new Error("Course ID is missing");

      const formData = new FormData();
      formData.append("courseTitle", input.courseTitle);
      formData.append("subTitle", input.subTitle);
      formData.append("description", input.description);
      formData.append("category", input.category);
      formData.append("courseLevel", input.courseLevel);
      formData.append("coursePrice", input.coursePrice);

      if (input.courseThumbnail) {
        formData.append("courseThumbnail", input.courseThumbnail);
      }

      await editCourse({ formData, courseId });
    } catch (error) {
      toast.error("Something went wrong while updating the course");
      console.error(error);
    }
  };

  // Publish or Unpublish Handler
  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response?.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };

  // Handle Toast Notifications
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <Loader2 className="h-4 w-4 animate-spin" />;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button className="bg-black text-white">Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              placeholder="Ex. Fullstack Developer"
              value={input.courseTitle}
              onChange={changeEventHandle}
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              placeholder="Ex. Become a Fullstack Developer from Zero to Hero"
              value={input.subTitle}
              onChange={changeEventHandle}
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="bg-white">
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="ReactJs">React Js</SelectItem>
                    <SelectItem value="AngularJs">Angular Js</SelectItem>
                    <SelectItem value="VueJs">Vue Js</SelectItem>
                    <SelectItem value="NodeJs">Node Js</SelectItem>
                    <SelectItem value="SpringBoot">Spring Boot</SelectItem>
                    <SelectItem value="Django">Django</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="SQL">SQL</SelectItem>
                    <SelectItem value="NextJs">Next Js</SelectItem>
                    <SelectItem value="FrontendDevelopment">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="BackendDevelopment">
                      Backend Development
                    </SelectItem>
                    <SelectItem value="MERNStack">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="MEANStack">
                      MEAN Stack Development
                    </SelectItem>
                    <SelectItem value="FullstackDevelopment">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="WebDevelopment">
                      Web Development
                    </SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="DataScience">Data Science</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                value={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="bg-white">
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">₹</span>
              <Input
                type="number"
                name="coursePrice"
                placeholder="Price"
                value={input.coursePrice}
                onChange={changeEventHandle}
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input type="file" onChange={selectThumbnail} accept="image/*" />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div className="space-x-2">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={updateCourseHandler}
              className="bg-black text-white"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-2 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
