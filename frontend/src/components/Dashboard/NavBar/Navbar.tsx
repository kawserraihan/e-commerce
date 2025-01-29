"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiHeart,
  FiShoppingCart,
  FiLogIn,
  FiUserPlus,
  FiSearch,
  FiMapPin,
} from "react-icons/fi";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import Image from "next/image";
import Cookies from "js-cookie";

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="text-gray-600 hover:text-green-500 transition-colors duration-200"
  >
    {label}
  </Link>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}api//jwt/refresh/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.access;
        if (newAccessToken) {
          Cookies.set("accessToken", newAccessToken, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          console.log("Access token refreshed successfully.");
          return true;
        }
      } else {
        console.error("Failed to refresh access token.");
        Cookies.remove("accessToken");
        Cookies.remove("refresh");
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
    return false;
  };

  useEffect(() => {
    const fetchCartData = async () => {
      let token = Cookies.get("accessToken");

      if (!token) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          token = Cookies.get("accessToken");
        } else {
          setIsAuthenticated(false);
          return;
        }
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else if (response.status === 401) {
          console.log("Access token expired. Attempting to refresh...");
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            await fetchCartData();
          } else {
            setIsAuthenticated(false);
          }
        } else {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCartCount(data?.item_count || 0);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
        setIsAuthenticated(false);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div style={{ paddingTop: "6rem" }}>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center px-6 py-2 text-xs border-b border-gray text-gray-500 ml-3 mr-3">
          <div className="flex items-center gap-7">
            <NavLink href="/auth/signup" label="Dealers" />
            <NavLink href="/account" label="Wholesale Products" />
            <NavLink href="/wishlist" label="Special Discount" />
            <NavLink href="/tracking" label="Order Tracking" />
          </div>
          <div className="flex items-center gap-7">
            <span className="text-xs">
              Need help? Call Us: <strong className="text-green-500">+880 160 863 7246</strong>
            </span>
            <div className="flex items-center gap-7">
              <span>English</span>
              <span>BDT</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 ml-5 mr-5">
          {/* Logo */}
          <Link href="/">
            <Image
              src="https://demoapi.anticbyte.com/media/banners/msmart.png"
              alt="Logo"
              width={100}
              height={40}
              priority
            />
          </Link>

          {/* Search Bar and Categories */}
          <div className="hidden md:flex items-center flex-1 gap-4">
            {/* Browse All Categories */}
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-green-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <HiOutlineMenuAlt4 className="text-lg mr-2" />
                Browse All Categories
              </button>
              {isMenuOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-50 w-64">
                  <ul>
                    <li className="hover:text-green-500">
                      <Link href="/categories/electronics">Electronics</Link>
                    </li>
                    <li className="hover:text-green-500">
                      <Link href="/categories/clothing">Clothing</Link>
                    </li>
                    <li className="hover:text-green-500">
                      <Link href="/categories/home-appliances">Home Appliances</Link>
                    </li>
                    <li className="hover:text-green-500">
                      <Link href="/categories/books">Books</Link>
                    </li>
                    <li className="hover:text-green-500">
                      <Link href="/categories/beauty-products">Beauty Products</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Search Box */}
            <div
              className={`flex items-center ml-10 border shadow rounded-sm overflow-hidden w-full max-w-lg transition-colors duration-200 ${
                isFocused ? "border-2 border-[#8ce7ac]" : "border-gray-300"
              }`}
            >
              <input
                type="text"
                placeholder="Search for items..."
                className="flex-1 px-4 py-2 text-sm outline-none focus:ring-0 focus:border-none"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <button className="px-4 py-2 bg-transparent text-gray-600 hover:text-green-500">
                <FiSearch size={20} />
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 ml-10 px-4 py-2 border shadow border-gray-300 rounded-md text-gray-700 bg-gray-100 cursor-pointer hover:text-green-500">
              <FiMapPin className="text-green-500" />
              <span className="text-sm font-medium">Your Location</span>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-7">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-500 relative group"
            >
              <FiShoppingCart size={24} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-500"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-500"
                >
                  <FiLogIn size={20} />
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-500"
                >
                  <FiUserPlus size={20} />
                  Signup
                </Link>
              </>
            )}

            {/* Hamburger Menu */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt4 size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white p-4 shadow-md">
            <ul className="space-y-4">
              <li>
                <NavLink href="/about" label="About Us" />
              </li>
              <li>
                <NavLink href="/account" label="My Account" />
              </li>
              <li>
                <NavLink href="/wishlist" label="Wishlist" />
              </li>
              <li>
                <NavLink href="/tracking" label="Order Tracking" />
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-500"
                >
                  <FiLogIn size={20} />
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-500"
                >
                  <FiUserPlus size={20} />
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}
