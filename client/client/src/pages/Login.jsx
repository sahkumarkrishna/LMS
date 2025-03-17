// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   useLoginUserMutation,
//   useRegisterUserMutation,
// } from "@/Features/api/authApi";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Login = () => {
//   const [SignInput, setSignInput] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loginInput, setLoginInput] = useState({ email: "", password: "" });

//   const [
//     registerUser,
//     {
//       data: registerData,
//       error: registerError,
//       isLoading: registerIsLoading,
//       isSuccess: registerIsSuccess,
//     },
//   ] = useRegisterUserMutation();

//   const [
//     loginUser,
//     {
//       data: loginData,
//       error: loginError,
//       isLoading: loginIsLoading,
//       isSuccess: loginIsSuccess,
//     },
//   ] = useLoginUserMutation();
//   //navigate
//   const navigate = useNavigate();
//   const changeInputHandler = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "signup") {
//       setSignInput({ ...SignInput, [name]: value });
//     } else {
//       setLoginInput({ ...loginInput, [name]: value });
//     }
//   };

//   useEffect(() => {
//     // Handle successful registration
//     if (registerIsSuccess && registerData) {
//       toast.success(registerData.message || "Signup successful.");
//     }
//     // Handle registration error
//     if (registerError) {
//       toast.error(registerError.data.message || "login Failed .");
//     }
//     // Handle successful login
//     if (loginIsSuccess && loginData) {
//       toast.success(loginData.message || "Login successful.");
//       //go to home page
//       navigate("/");
//     }
//     // Handle login error
//     if (loginError) {
//       toast.error(loginError.data.message || "login Failed .");
//     }
//   }, [
//     registerIsSuccess,
//     registerError,
//     loginIsSuccess,
//     loginError,
//     loginData,
//     registerData,
//   ]);

//   const handleRegistration = async (type) => {
//     const inputData = type === "signup" ? SignInput : loginInput;
//     const action = type === "signup" ? registerUser : loginUser;
//     try {
//       await action(inputData);
//     } catch (err) {
//       console.error("Error during action:", err);
//     }
//   };

//   return (
//     <div className="flex items-center w-full justify-center mt-20">
//       <Tabs defaultValue="Login" className="w-[400px]">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="Signup">Signup</TabsTrigger>
//           <TabsTrigger value="Login">Login</TabsTrigger>
//         </TabsList>
//         <TabsContent value="Signup">
//           <Card>
//             <CardHeader>
//               <CardTitle>Signup</CardTitle>
//               <CardDescription>
//                 Create a new account and click signup when you're done.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   type="text"
//                   name="name"
//                   value={SignInput.name}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="name"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="username">Email</Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={SignInput.email}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="abc@gmail.com"
//                   required
//                 />
//               </div>
              
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   value={SignInput.password}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="password"
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 className="bg-black text-white"
//                 disabled={registerIsLoading}
//                 onClick={() => handleRegistration("signup")}
//               >
//                 {registerIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : (
//                   "Signup"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//         <TabsContent value="Login">
//           <Card>
//             <CardHeader>
//               <CardTitle>Login</CardTitle>
//               <CardDescription>Login to your account.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={loginInput.email}
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   placeholder="email"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   value={loginInput.password}
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   placeholder="password"
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 className="bg-black text-white"
//                 disabled={loginIsLoading}
//                 onClick={() => handleRegistration("login")}
//               >
//                 {loginIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : (
//                   "Login"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Login;









              

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/Features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [SignInput, setSignInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignInput({ ...SignInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      
    }
    if (registerError) {
      toast.error(registerError.data.message || "Registration failed.");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login failed.");
    }
  }, [
    registerIsSuccess,
    registerError,
    loginIsSuccess,
    loginError,
    loginData,
    registerData,
  ]);

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? SignInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    try {
      await action(inputData);
    } catch (err) {
      console.error("Error during action:", err);
    }
  };

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="Login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Signup">Signup</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="Signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={SignInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={SignInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={SignInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Your password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-black text-white"
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Your password"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-black text-white"
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
