"use client";
import React, { useEffect, useState } from "react";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Image paths for the slider
  const images = [
    "https://demoapi.anticbyte.com/media/banners/slider_1.jpg",
    "https://demoapi.anticbyte.com/media/banners/SLIDER-2.jpg"
  ];

  // Cycle through the images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  // Function to handle manual image switching
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundImage: `url(${images[currentIndex]})`, // Background image
        backgroundSize: "cover", // Cover the entire section
        backgroundPosition: "center", // Center the image
        borderRadius: "1rem", // Rounded corners
        padding: "2rem",
        margin: "1rem auto", // Centered section
        position: "relative",
        height: "400px", // Reduced height
        width: "93%", // Slightly reduced width evenly
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
