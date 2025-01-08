"use client";
import React, { useEffect, useState } from "react";
import { useGetBannerQuery } from "../../../../redux/features/bannerApiSlice";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, isError } = useGetBannerQuery({ page: 1, page_size: 10 });
  const images = React.useMemo(() => data?.results.map((banner) => banner.image) || [], [data]);
  
  useEffect(() => {
    if (images.length === 0) return; 

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); 
  }, [images]); 

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading banners</div>;

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundImage: `url(${images[currentIndex] || ""})`,
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        borderRadius: "1rem",
        padding: "2rem",
        margin: "1rem auto", 
        position: "relative",
        height: "400px", 
        width: "93%",
        marginTop: "2rem",
      }}
    >
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          border: "none",
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
          position: "absolute",
          right: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "2rem",
          height: "2rem",
          cursor: "pointer",
        }}
      >
        ›
      </button>
    </section>
  );
}
