import Navbar from "@/components/ui/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
        {/* Child components like HeroSection or Login will be rendered here */}
      </main>
    </div>
  );
};

export default MainLayout;
