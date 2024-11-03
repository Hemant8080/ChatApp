import React, { useState } from "react";
import Victory from "../../assets/victory.svg";
import background from "../../assets/login2.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiclient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

function Auth() {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }

    return true;
  };
  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmpassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiclient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
     
      if (response.data.userData.id) {
        setUserInfo(response.data.userData);
        if (response.data.userData.profileSetup) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }
      }
    }
  }

  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiclient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setUserInfo(response.data.userData);
        navigate("/profile");
      }
      (response);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="h-[80vh] bg-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[75vw] rounded-3xl grid xl:grid-cols-2  ">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className=" items-center justify-center flex flex-col">
            <div className="items-center justify-center flex">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            {" "}
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  className="rounded-full"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 " value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  className="rounded-full"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex items-center justify-center">
          <img src={background} alt="Background login" className="h-[75vh]" />
        </div>
      </div>
    </div>
  );
}

export default Auth;
