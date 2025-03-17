import { useSendForgotPasswordCodeUserMutation } from "@/Features/api/authApi";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sendForgotPasswordCode, { isLoading, error, isSuccess }] =
    useSendForgotPasswordCodeUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the email for forgot password
      await sendForgotPasswordCode({ email }).unwrap();
      console.log("Forgot password code sent successfully");
    } catch (err) {
      console.error("Failed to send forgot password code:", err);
      toast.error(err?.data?.message || "Failed to send forgot password code.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset code sent successfully! Check your email.");
      navigate("/verify-forgot-password-code"); // Redirect after success
    }
    if (error) {
      console.error("Error details:", error);
      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  }, [isSuccess, error, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full flex items-center justify-center bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              disabled={isLoading || isSuccess}
            >
              {isLoading ? "Sending..." : "Send Forgot Password Code"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
