"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiClient } from "@/lib";
import { ADMIN_API_ROUTE } from "@/utils";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AuthListState, authState } from "@/store";
import { useRouter } from "next/navigation";
const inter = Inter({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const Login = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const useAuthValue = useRecoilValue(AuthListState);
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const resposne = await ApiClient.post(ADMIN_API_ROUTE.Login, {
        email,
        password,
      });

      if (resposne.data.userInfo) {
        setAuth(resposne.data.userInfo);
        console.log(useAuthValue);
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center bg-[url('/home/home-bg.png')] justify-center bg-cover bg-center bg-no-repeat">
      <div className=" absolute inset-0 bg-blue-500 bg-opacity-50 backdrop-blur-2xl"></div>
      <Card className=" shadow-2xl z-10 bg-black border-none text-white bg-opacity-10 w-[480px]">
        <CardHeader className="flex flex-col gap-1 capitalize text-3xl items-center">
          <div className=" flex flex-col gap-3 capitalize text-3xl items-center">
            <Image
              src={"/logo.jpg"}
              alt="logo"
              width={80}
              height={100}
              className="cursor-pointer rounded-[50%]"
            ></Image>
            <div className="text-xl uppercase font-mediu text-white">
              <span className={inter.className}>Admin login</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className=" flex flex-col items-center w-full justify-center">
          <div className="flex flex-col items-center gap-2 w-full">
            <Input
              type="email"
              placeholder="Email"
              className="text-black w-[300px] text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              className="text-black w-[300px] text-center"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
        </CardContent>
        <CardFooter className=" flex flex-col items-center gap-2 justify-center">
          <Button
            color="danger"
            className="w-[300px] capitalize"
            size={"lg"}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
