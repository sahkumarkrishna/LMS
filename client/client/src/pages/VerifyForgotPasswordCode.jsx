import { useVerifyForgotPasswordCodeUserMutation } from "@/Features/api/authApi";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyForgotPasswordCode = () => {
  const [email, setEmail] = useState(""); // Added email state
  const [code, setCode] = useState(""); // Controlled state for OTP
  const navigate = useNavigate();

  const [verifyForgotPasswordCode, { error, isLoading, isSuccess }] =
    useVerifyForgotPasswordCodeUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required.");
      return;
    }
    if (code.length !== 6) {
      toast.error("Please enter a 6-digit code.");
      return;
    }
    try {
      await verifyForgotPasswordCode({ email, code }).unwrap();
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Verification successful! You can now reset your password."
      );
      navigate("/new-password");
    }

    if (error) {
      toast.error(
        error?.data?.message || "Verification failed. Please try again."
      );
    }
  }, [isSuccess, error, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="p-6 w-96 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-center">
            Verify Your Code
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input Field */}
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* OTP Input */}
          <div className="flex justify-center items-center w-full">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              className="flex justify-center items-center gap-x-2"
            >
              <InputOTPGroup className="flex gap-x-2">
                <InputOTPSlot index={0} className="text-center" />
                <InputOTPSlot index={1} className="text-center" />
                <InputOTPSlot index={2} className="text-center" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="flex gap-x-2">
                <InputOTPSlot index={3} className="text-center" />
                <InputOTPSlot index={4} className="text-center" />
                <InputOTPSlot index={5} className="text-center" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full flex items-center justify-center bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-gray-800"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">🔄</span> Verifying...
              </>
            ) : (
              "Verify Code and Reset Password"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default VerifyForgotPasswordCode;
