import { useSetNewPasswordMutation } from "@/Features/api/authApi";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const [setNewPasswordMutation, { error, isLoading, isSuccess }] =
    useSetNewPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      toast.error("Both fields are required!");
      return;
    }

    try {
      await setNewPasswordMutation({ email, newPassword }).unwrap();
    } catch (err) {
      console.error("Password update failed:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully!");
      navigate("/login");
    }

    if (error) {
      toast.error(error?.data?.message || "Failed to set new password.");
    }
  }, [isSuccess, error, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="max-w-md w-full shadow-lg rounded-lg p-6">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold">
              Set New Password
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full flex items-center justify-center bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">🔄</span> Updating...
                </>
              ) : (
                "Set New Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPassword;
