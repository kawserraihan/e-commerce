
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Background colors for the hero section
  const backgrounds = [
    "#F0FDF4", // Light green
    "#E0F7FA", // Light blue
    "#FFF7E6", // Light orange
    "#FDE2E4", // Light pink
  ];

  // Image paths for the slider
  const images = ["/images/deals.jpg", "/images/deals2.jpg"];

  // Cycle through the backgrounds and images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: backgrounds[currentIndex], // Dynamically set background
        transition: "background-color 1s ease-in-out", // Smooth transition effect
        padding: "2rem",
        borderRadius: "0.5rem",
        margin: "1rem",
        position: "relative",
      }}
    >
      {/* Left Content */}
      <div
        style={{
          flex: 1,
          textAlign: "left",
          alignSelf: "flex-start",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#065F46",
            marginBottom: "1rem",
            marginLeft: "0",
          }}
        >
          Best Accessories <br /> Big Discount
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "1.125rem",
            color: "#065F46",
            marginBottom: "1.5rem",
            marginLeft: "0",
          }}
        >
          Save up to 50% off on your first order
        </p>

        {/* Input Field and Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "0",
          }}
        >
          {/* Input Field */}
          <input
            type="email"
            placeholder="Your email address"
            style={{
              padding: "0.75rem",
              border: "1px solid #D1D5DB",
              borderRadius: "2rem 0 0 2rem",
              flex: "1",
              outline: "none",
              fontSize: "1rem",
              maxWidth: "250px",
            }}
          />

          {/* Button */}
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#10B981",
              color: "#FFFFFF",
              fontWeight: "bold",
              border: "none",
              borderRadius: "0 2rem 2rem 0",
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Right Image Slider */}
      <div
        style={{
          flex: 1,
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src={images[currentIndex]} // Dynamically set the image
          alt={`Hero Banner ${currentIndex + 1}`}
          style={{
            maxWidth: "100%",
            height: "300px",
            borderRadius: "0.375rem",
            transition: "opacity 1s ease-in-out", // Smooth fade effect
          }}
        />
      </div>
    </section>
  );
}
