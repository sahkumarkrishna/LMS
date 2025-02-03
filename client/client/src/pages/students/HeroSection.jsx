import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4 ">
          Find the Best Course for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 text-lg sm:text-xl mb-8">
          Discover, Learn, and Upskill with our wide range of courses.
        </p>
        <form
          action=""
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <input
            type="text"
            aria-label="Search for a course"
            className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent outline-none"
            placeholder="Search for a course..."
          />
          <Button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800"
          >
            Search
          </Button>
        </form>
        <Button className="bg-white text-blue-600 rounded-full   dark:hover:bg-gray-100">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};
export default HeroSection;
