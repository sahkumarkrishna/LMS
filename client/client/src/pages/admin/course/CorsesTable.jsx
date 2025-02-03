import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCoursesQuery } from "@/Features/api/courseApi.js";
import { Badge, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CoursesTable = () => {
  const { data, isLoading, isError } = useGetCreatorCoursesQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !data)
    return <h1>Error loading courses. Please try again later.</h1>;

  const courses = data.courses || [];

  return (
    <div>
      <Button
        onClick={() => navigate("create")}
        className="bg-black text-white"
      >
        Create a new course
      </Button>
      {courses.length === 0 && (
        <p>No courses available. Create one to get started!</p>
      )}
      <Table>
        <TableCaption>A list of recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesTable;
