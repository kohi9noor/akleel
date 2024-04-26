import Sidebar from "@/components/admin/Sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" bg-[#f5f5fe] flex">
      <Sidebar></Sidebar>

      <section className=" flex-1 flex flex-col text-white">
        <div className=" h-48 bg-[#0e142b] flex justify-center flex-col px-10 gap-3">
          <h1 className=" text-5xl">Dashboard</h1>
          <p>the scrapping engine is powered by bright data</p>
        </div>
      </section>
    </section>
  );
};

export default AdminLayout;
