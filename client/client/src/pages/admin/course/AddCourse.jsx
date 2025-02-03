import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/Features/api/courseApi";
import { Label } from "@radix-ui/react-label";
import { SelectValue } from "@radix-ui/react-select";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation(); // Corrected hook usage
  const navigate = useNavigate();

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  // For displaying toast notifications
  useEffect(() => {
    if (isSuccess) {
      toast.success(data ?.message || "Course created successfully!");
      navigate("/admin/course")
    }
    if (error) {
      toast.error(error.message || "Failed to create course.");
    }
  }, [isSuccess, error, data, navigate]);

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

 
  return (
    <div className="flex-1 mx-10 my-5">
      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-2">
          Let's add a course and provide some basic details!
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
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your course name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-white">
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next js">Next js</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
                <SelectItem value="CSS">CSS</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-black text-white"
            onClick={() => navigate("/admin/course")}
          >
            Back
          </Button>
          <Button
            className="bg-black text-white"
            disabled={isLoading}
            onClick={createCourseHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                Please wait...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
