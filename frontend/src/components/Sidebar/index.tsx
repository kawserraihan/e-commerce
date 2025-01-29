"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useCookieStorage from "@/hooks/useLocalStorage";
import { getUserFromCookie } from "@/hooks/getLoginUser";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}


const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg"
            height="23px"
            viewBox="90 -960 960 960"
            width="23px"
            fill="#ccccff">
            <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" />
          </svg>
        ),
        label: "Products",
        route: "/products",
        roles: ["2", "3"],
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg"
            height="23px"
            viewBox="40 -960 960 960"
            width="23px"
            fill="#ccccff"
          >
            <path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z" />
          </svg>
        ),
        label: "Orders",
        route: "#",
        children: [
          { label: "Orders", route: "/orders" },
          { label: "Invoice", route: "/invoice" },
        ],
        roles: ["2", "3", "4"],
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg"
            height="23px"
            viewBox="40 -960 960 960"
            width="23px"
            fill="#ccccff"
          >
            <path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z" />
          </svg>
        ),
        label: "User management",
        route: "#",
        children: [
          { label: "Users", route: "/users" },
          // { label: "Invoice", route: "/invoice" },
        ],
      },
      {
        icon: (

          <svg xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="90 -960 960 960"
            width="22px"
            fill="#ccccff"
          >
            <path d="M200-80q-33 0-56.5-23.5T120-160v-451q-18-11-29-28.5T80-680v-120q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v120q0 23-11 40.5T840-611v451q0 33-23.5 56.5T760-80H200Zm0-520v440h560v-440H200Zm-40-80h640v-120H160v120Zm200 280h240v-80H360v80Zm120 20Z" />
          </svg>
        ),
        label: "Stock",
        route: "/stock",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg"
            height="23px"
            viewBox="90 -960 960 960"
            width="23px"
            fill="#ccccff"
          >
            <path d="M300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720Zm0 400q-25 0-42.5 17.5T240-260q0 25 17.5 42.5T300-200q25 0 42.5-17.5T360-260q0-25-17.5-42.5T300-320ZM160-840h640q17 0 28.5 11.5T840-800v280q0 17-11.5 28.5T800-480H160q-17 0-28.5-11.5T120-520v-280q0-17 11.5-28.5T160-840Zm40 80v200h560v-200H200Zm-40 320h640q17 0 28.5 11.5T840-400v280q0 17-11.5 28.5T800-80H160q-17 0-28.5-11.5T120-120v-280q0-17 11.5-28.5T160-440Zm40 80v200h560v-200H200Zm0-400v200-200Zm0 400v200-200Z" />
          </svg>
        ),
        label: "Core",
        route: "#",
        children: [
          { label: "Category", route: "/core/core-categories" },
          { label: "Sub Category", route: "/core/core-subcategories" },
          { label: "Child Category", route: "/core/core-childcategories" },
          { label: "Brands", route: "/core/core-brands" },
          { label: "Models", route: "/core/core-models" },
          { label: "Sizes", route: "/core/core-size" },
          { label: "Colors", route: "/core/core-color" },
        ],
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="90 -960 960 960" width="24px" fill="#ccccff"><path d="m691-150 139-138-42-42-97 95-39-39-42 43 81 81ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z" /></svg>
        ),
        label: "Incentives",
        route: "#",
        children: [
          { label: "Coupon", route: "/incentives/incentives-coupon" },
          { label: "Discount Products", route: "/incentives/incentives-discount" },
          { label: "Campaign", route: "/incentives/incentives-campaign" },
          // { label: "Subcategories", route: "/core/core-subcategories" },
          // { label: "Colors", route: "/core/core-color" },
          // { label: "Brands", route: "/core/core-brands" },

        ],
      },
 
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useCookieStorage("selectedMenu", "dashboard");
  const [userRole, setUserRole] = useState("");

  const user = getUserFromCookie();
  useEffect(() => {
    const roleMap = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    };
    const role = roleMap[user?.role_id as 1 | 2 | 3 | 4] || 0; // Assert valid role_id keys.
    setUserRole(role.toString());
  }, [user]);

  console.log(userRole);

  const pathname = usePathname()

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-15 py-5.5 lg:py-4">
          <Link href="/">
            <Image
              width={176}
              height={32}
              src={"/images/cover/msmart.png"}
              alt="Logo"
              priority
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>
                <ul className="mb-6 flex flex-col gap-1.5">
                  <li>
                    <Link
                      href='/dashboard'
                      className={`${pathname === "/dashboard" ? "bg-graydark dark:bg-meta-4" : ""} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="22px"
                        viewBox="40 -960 960 960"
                        width="22px"
                        fill="#ccccff"
                      >
                        <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" />
                      </svg>
                      Dashboard
                    </Link>
                  </li>

                  {
                    group.menuItems
                      .filter((menuItem, index) => {
                        // Allow all options if userRole is 1 (admin)
                        if (Number(userRole) === 1) return true;

                        // If the role is 2 or 3, slice the data from 0-2
                        if (Number(userRole) === 2 || Number(userRole) === 3) {
                          return index < 2; // Slice from 0 to 2 (exclusive
                        }
                        // Otherwise, filter based on menuItem.roles
                        return menuItem.roles && menuItem.roles.includes(userRole);
                      })
                      .map((menuItem, menuIndex) => (
                        <SidebarItem
                          key={menuIndex}
                          item={menuItem}
                          pageName={pageName}
                          setPageName={setPageName}
                        />
                      ))
                  }

                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;