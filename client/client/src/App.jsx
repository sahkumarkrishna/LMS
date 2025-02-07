import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HeroSection from "./pages/students/HeroSection";
import Login from "./pages/Login";
import Courses from "./pages/students/Courses";
import MyLearning from "./pages/students/MyLearning";
import Profile from "./pages/students/Profile";
import Sidebar from "./pages/admin/lecture/Sidebar";
import Dashboard from "./pages/admin/lecture/Dashboard";
import CorsesTable from "./pages/admin/course/CorsesTable";
import AddCourse from "./pages/admin/course/AddCourse";
import { EditCourse } from "./pages/admin/course/EditCourse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Wrap everything in MainLayout
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },

      {
        path: "login",
        element: <Login />, // Render Login for "/login"
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      //admin router start from here
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CorsesTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },

          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
