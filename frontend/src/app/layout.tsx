"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Provider from '../../redux/provider';
import { Setup } from "@/components/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
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
        <Provider>
          <Setup/>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
        </Provider>

      </body>
    </html>
  );
}
