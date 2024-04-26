"use client";
import { Sidebar as sidebar } from "react-pro-sidebar";

import { Inter } from "next/font/google";

import {
  Sidebar as ReactProSideBar,
  Menu,
  MenuItem,
  sidebarClasses,
} from "react-pro-sidebar";

const inter = Inter({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
import {
  Menu as LMenu,
  BookOpen,
  Home,
  LogOut,
  Database,
  Hotel,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const [selectItem, setSelectItem] = useState<string | undefined>();

  const MenuItems = [
    {
      label: "DashBoard",
      icon: <Home></Home>,
      link: "/admin/dashboard",
    },
    {
      label: "Hotels",
      icon: <Hotel></Hotel>,
      link: "/admin/hotels",
    },
    {
      label: "Booking",
      icon: <BookOpen></BookOpen>,
      link: "/admin/bookings",
    },
    {
      label: "Scrape Data",
      icon: <Database></Database>,
      link: "/admin/scrape-data",
    },
    {
      label: "Trips",
      icon: <LMenu></LMenu>,
      link: "/admin/menu",
    },
  ];

  const hadnleItemClick = (link: string) => {
    setSelectItem(link);
    router.push(link);
  };

  const router = useRouter();

  return (
    <div className=" min-h-[100vh] overflow-hidden">
      <ReactProSideBar
        className="h-full overflow-hidden"
        rootStyles={{
          [`${sidebarClasses.container}`]: {
            background: "#ffffff",
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          },
        }}
      >
        <Menu className=" h-[100vh] max-h-[100vh] overflow-hidden text-black">
          <div className="flex items-center justify-center my-10 gap-5 flex-col">
            <Image
              src={"/logo.jpg"}
              alt="logo"
              width={150}
              height={150}
              className=" rounded-[50%] cursor-pointer"
              onClick={() => router.push("/admin/dashboard")}
            ></Image>
            <span className=" text-3xl uppercase font-medium">
              <span className={inter.className}>Akleel</span>
            </span>
          </div>

          {MenuItems.map((item) => {
            return (
              <React.Fragment key={item.label}>
                <MenuItem
                  onClick={() => hadnleItemClick(item.link)}
                  icon={item.icon}
                  active={selectItem === item.link}
                >
                  {item.label}
                </MenuItem>
              </React.Fragment>
            );
          })}
          <MenuItem
            icon={<LogOut></LogOut>}
            active={selectItem === "/admin/logout"}
            onClick={() => hadnleItemClick("/admin/logout")}
          >
            {" "}
            Logout
          </MenuItem>
        </Menu>
      </ReactProSideBar>
    </div>
  );
};

export default Sidebar;
