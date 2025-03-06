import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();

  // Corrected the navigate function and added a more meaningful comment
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };

  const showLectureTitle = () => {
    alert(`Lecture Title: ${lecture.lectureTitle}`);
  };

  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        Lecture- {index + 1}: {lecture.lectureTitle}
      </h1>

      <div className="flex items-center gap-2">
        <Edit
          onClick={goToUpdateLecture}
          size={20}
          className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        />
        <button
          onClick={showLectureTitle}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
        
        </button>
      </div>
    </div>
  );
};

export default Lecture;
