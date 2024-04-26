"use client";
import { Button } from "@/components/ui/button";
import { AuthListState, authState } from "@/store";
import React from "react";
import { useRecoilValue } from "recoil";

const Home = () => {
  const authSTate = useRecoilValue(authState);

  console.log(authSTate);

  return <div>huehue</div>;
};

export default Home;
