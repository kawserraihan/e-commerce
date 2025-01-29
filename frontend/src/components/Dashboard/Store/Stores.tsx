"use client";
import React, { useState } from "react";
import { useGetStoresQuery } from "../../../../redux/features/storeApiSlice";
import Image from "next/image";

export default function HomePageSection() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const categories = [
    { name: "Google", items: "Search & Ads", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", color: "#F0F8FF", link: "http://localhost:3000/store" },
    { name: "Facebook", items: "Social Media", image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", color: "#FAFAD2", link: "http://localhost:3000/store" },
    { name: "Adidas", items: "Sportswear", image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", color: "#FFE4E1", link: "http://localhost:3000/store" },
    { name: "Meta", items: "Metaverse", image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", color: "#FFFACD", link: "http://localhost:3000/store" },
    { name: "Amazon", items: "E-commerce", image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", color: "#F0FFF0", link: "http://localhost:3000/store" },
    { name: "Microsoft", items: "Software & Hardware", image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", color: "#F5F5DC", link: "http://localhost:3000/store" },
    { name: "Apple", items: "Technology", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", color: "#E6E6FA", link: "http://localhost:3000/store" },
    { name: "Tesla", items: "Electric Cars", image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg", color: "#F8F8FF", link: "http://localhost:3000/store" },
    { name: "Netflix", items: "Streaming", image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", color: "#FFF0F5", link: "http://localhost:3000/store" },
    { name: "Samsung", items: "Electronics", image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", color: "#FAF0E6", link: "http://localhost:3000/store" },
  ];


  const handleNext = () => {
    setVisibleIndex((prev) => (prev + 1) % categories.length);
  };

  const handlePrevious = () => {
    setVisibleIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };
  const { data, isLoading, isError } = useGetStoresQuery({ page: 1, page_size: 10 });

  return (
    <div style={{ padding: "2rem", position: "relative", marginLeft: "1.5rem", marginRight: "1.5rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#111827" }}>All Stores</h2>

      <div style={{ position: "absolute", top: "3rem", right: "0", display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handlePrevious}
          style={{
            border: "none",
            backgroundColor: "#ddd",
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
          }}
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          style={{
            border: "none",
            backgroundColor: "#ddd",
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
            marginRight: "3rem"
          }}
        >
          ›
        </button>
      </div>

      <div style={{ display: "flex", gap: "1rem", overflow: "hidden", marginTop: "2rem" }}>
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${visibleIndex * 100}%)`,
            gap: "1rem",

          }}
        >
          {(data as any)?.stores?.map((category: { user_id: any; color: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; items: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined) => (
            <a
              href={`/store/${category.user_id}`}
              key={index}
              style={{
                flex: "0 0 150px",
                backgroundColor: category.color,
                borderRadius: "0.5rem",
                padding: "1rem",
                textAlign: "center",
                height: "170px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", // Updated shadow
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
                overflow: "hidden",
                marginTop: "1rem",
                marginBottom: "1rem"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0.375rem",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", // Updated shadow
                }}
              >
                <Image
                  src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
                  alt=''
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                  width={170}
                  height={200}
                />
              </div>
              <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", marginTop: "0.5rem" }}>{category.name}</h3>
              <p style={{ fontSize: "0.75rem", color: "#666", marginTop: "0.25rem" }}>{category.items}</p>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
