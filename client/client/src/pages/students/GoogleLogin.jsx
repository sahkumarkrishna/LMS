import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useGoogleUserMutation } from "@/Features/api/authApi";
import { auth, provider } from "@/firebase/firebaseConfig";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const [googleUser, { isLoading, isError, isSuccess, error }] =
    useGoogleUserMutation(); // ✅ Proper usage

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User signed in:", user);

      const response = await googleUser({
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      }).unwrap(); // ✅ Correctly handles the API response

      // ✅ Store Token in Local Storage
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      console.log("Google login successful:", response);
      navigate("/"); // Redirect after success
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        {isLoading ? (
          <>
            <LoadingSpinner size={20} /> Signing in...
          </>
        ) : (
          <>
            <FcGoogle size={20} /> Sign in with Google
          </>
        )}
      </Button>

      {isSuccess && <p className="text-green-500 mt-2">✅ Login successful!</p>}
      {isError && (
        <p className="text-red-500 mt-2">
          ❌ {error?.data?.message || "Login failed"}
        </p>
      )}
    </div>
  );
};

export default GoogleLogin;
