"use client";
import React, { useEffect, useState } from "react";
import CustomProvider from "../../redux/provider"; // Import your CustomProvider
// import Loader from "@/components/common/Loader";

import { ToastContainer } from 'react-toastify';

// Importing necessary styles
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <CustomProvider> {/* Use CustomProvider here */}
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
         

            {children}
            
            
          
          </div>
          <ToastContainer />
        </CustomProvider>
      </body>
    </html>
  );
}
