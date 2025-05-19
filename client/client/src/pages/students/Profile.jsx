import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUploadUserMutation,
} from "@/Features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserIsLoading, isSuccess, error }] =
    useUploadUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Profile updated successfully!");
    }

    if (error) {
      toast.error(
        error?.message || "Failed to update profile. Please try again."
      );
    }
  }, [isSuccess, error]);

  if (isLoading) {
    return <h1>Profile Loading...</h1>;
  }

  if (!data || !data.user) {
    return <h1>No user data available.</h1>;
  }

  const { user } = data;

  const updateUserHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name || user.name);
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);

      await updateUser(formData).unwrap();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="User Avatar"
            />
            <AvatarFallback>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2 ">
            <h2 className="font-semibold text-gray-900">
              Name:
              <span className="font-normal text-gray-700 ml-2">
                {user?.name || "N/A"}
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900">
              Email:
              <span className="font-normal text-gray-700 ml-2">
                {user?.email || "N/A"}
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900">
              Role:
              <span className="font-normal text-gray-700 ml-2">
                {user?.role?.toUpperCase() || "N/A"}
              </span>
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-black mt-2 text-white"
                variant="outline"
                size="sm"
              >
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="photo" className="text-right">
                    Profile Photo
                  </Label>
                  <Input
                    onChange={onChangeHandler}
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-5">
          {user?.enrolledCourse?.length === 0 ? (
            <h1>You haven't enrolled in any courses yet.</h1>
          ) : (
            user?.enrolledCourse?.map((course) => (
              <Course key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
