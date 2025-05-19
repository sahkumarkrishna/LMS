import { Menu, School } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import DarkMode from "@/DarkMode";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { useLogoutAdminMutation } from "@/Features/api/adminApi";
import { useSelector } from "react-redux";

const AdminMenu = () => {
  const [LogoutAdmin, { data, isSuccess }] = useLogoutAdminMutation();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/admin/dashboard");
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="h-16 text-black bg-white border-b dark:border-b-gray-400 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={30} />
        </div>

        <div className="flex items-center gap-5">
          {admin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={admin?.photoUrl || "https://github.com/shadcn.png"}
                    alt="Admin Avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="bg-white">
                  <DropdownMenuItem>
                    <Link to="/profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={LogoutAdmin}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {admin?.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/admin/course">Course</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/adminlogin")}>
                Login
              </Button>
              <Button onClick={() => navigate("/adminlogin")}>Sign Up</Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <AdminMobileNavbar admin={admin} />
      </div>
    </div>
  );
};

export default AdminMenu;

export const AdminMobileNavbar = ({ admin }) => {
  const [LogoutAdmin] = useLogoutAdminMutation();


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-300"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-4 bg-white">
        <SheetHeader className="flex flex-row items-center justify-between mt-2"></SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <SheetClose asChild>
            <Link to="/profile">Edit Profile</Link>
          </SheetClose>
          <SheetClose asChild>
            <button onClick={LogoutAdmin} className="text-left">
              Log Out
            </button>
          </SheetClose>
          {admin?.role === "admin" && (
            <>
              <SheetClose asChild>
                <Link to="/admin/dashboard">Dashboard</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/admin/course">Course</Link>
              </SheetClose>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
