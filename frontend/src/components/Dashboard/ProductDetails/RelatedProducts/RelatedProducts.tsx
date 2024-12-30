
"use client"
import React from "react";
import Image from 'next/image';

interface Props {
  children: React.ReactNode;
}

export default function RelatedProducts() {
  const products = [
    {
      label: "Hot",
      labelColor: "#f43f5e", // Red
      name: "Ultra Bass Headphone",
      price: "$238.85",
      originalPrice: "$245.8",
      rating: 4,
      image: "/images/deals.jpg",
    },
    {
      label: "-12%",
      labelColor: "#3b82f6", // Blue
      name: "Smart Bluetooth Speaker",
      price: "$138.85",
      originalPrice: "$145.8",
      rating: 5,
      image: "/images/deals.jpg",
    },
    {
      label: "New",
      labelColor: "#10b981", // Green
      name: "HomeSpeak 12UEA Goole",
      price: "$738.85",
      originalPrice: "$1245.8",
      rating: 4.5,
      image: "/images/deals.jpg",
    },
    {
      label: "Hot",
      labelColor: "#f43f5e", // Red
      name: "Dadua Camera 4K 2022EF",
      price: "$89.8",
      originalPrice: "$98.8",
      rating: 4,
      image: "/images/deals.jpg",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        padding: "0 1rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
        }}
      >
        Related Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              padding: "1rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              position: "relative",
              textAlign: "center",
            }}
          >
            {/* Product Label */}
            <span
              style={{
                position: "absolute",
                top: "0.75rem",
                left: "0.75rem",
                backgroundColor: product.labelColor,
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: "700",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.25rem",
              }}
            >
              {product.label}
            </span>

            {/* Product Image */}
            <Image
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "contain",
                marginBottom: "1rem",
              }}
            />

            {/* Product Name */}
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              {product.name}
            </h3>

            {/* Product Ratings */}
            <div
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                justifyContent: "center",
                gap: "0.25rem",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < product.rating ? "#facc15" : "#e5e7eb", // Filled or unfilled stars
                    fontSize: "1rem",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Product Price */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#10b981",
                }}
              >
                {product.price}
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  textDecoration: "line-through",
                  color: "#6b7280",
                }}
              >
                {product.originalPrice}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              style={{
                padding: "0.75rem",
                backgroundColor: "#10b981",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
