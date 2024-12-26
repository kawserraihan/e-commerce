
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProductDetailsHero() {
  const [selectedImage, setSelectedImage] = useState("/images/deals.jpg"); // Default main image
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const thumbnails = [
    "/images/deals.jpg",
    "/images/deals.jpg",
    "/images/deals.jpg",

    "/images/deals.jpg",
  ];

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
      }}
    >
      {/* Breadcrumb */}
      <nav
        style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}
      >
        <a href="#" style={{ color: "#10b981", textDecoration: "none" }}>
          Home
        </a>{" "}
        /{" "}
        <a href="#" style={{ color: "#10b981", textDecoration: "none" }}>
          Vegetables & Tubers
        </a>{" "}
        / Seeds of Change Organic
      </nav>

      {/* Product Details Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 4fr 2fr",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Product Image */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <div
            style={{
              marginBottom: "1rem",
              overflow: "hidden",
              borderRadius: "0.5rem",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            <img
              src={selectedImage}
              alt="Product"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              } // Zoom in
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")} // Zoom out
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(thumb)} // Update main image
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  border:
                    selectedImage === thumb
                      ? "2px solid #10b981"
                      : "1px solid #d1d5db", // Highlight selected thumbnail
                  boxShadow:
                    selectedImage === thumb
                      ? "0 4px 6px rgba(0, 0, 0, 0.2)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
            }}
          >
            Seeds of Change Organic Quinoa, Brown
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginBottom: "1rem",
            }}
          >
            (132 reviews)
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#10b981",
                marginRight: "0.5rem",
              }}
            >
              $38
            </span>
            <span
              style={{
                fontSize: "1rem",
                textDecoration: "line-through",
                color: "#6b7280",
              }}
            >
              $52
            </span>
            <span
              style={{
                fontSize: "0.875rem",
                color: "#f43f5e",
                marginLeft: "0.5rem",
              }}
            >
              20% off
            </span>
          </div>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "1.5rem",
              color: "#4b5563",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rem
            officia, corrupti reiciendis minima nisi modi, quasi, odio minus
            dolore impedit fuga eum eligendi.
          </p>
          {/* Size Options */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Size / Weight:
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["50g", "60g", "80g", "100g", "150g"].map((size, index) => (
                <button
                  key={index}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #10b981",
                    backgroundColor: "#fff",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#10b981",
                    cursor: "pointer",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <input
              type="number"
              defaultValue="1"
              style={{
                width: "60px",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #d1d5db",
                textAlign: "center",
              }}
            />
            <button
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#10b981",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "700",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
            <button
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "#f3f4f6",
                color: "#6b7280",
                fontSize: "1rem",
                border: "1px solid #d1d5db",
                cursor: "pointer",
              }}
            >
              💖
            </button>
          </div>
        </div>

        {/* Category Section */}
        <div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h4
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                marginBottom: "1rem",
              }}
            >
              Category
            </h4>
            <ul style={{ listStyle: "none", padding: 0, color: "#6b7280" }}>
              {[
                { name: "Milk & Dairies", count: 8 },
                { name: "Clothing", count: 5 },
                { name: "Pet Foods", count: 3 },
                { name: "Baking Material", count: 12 },
                { name: "Fresh Fruit", count: 16 },
              ].map((category, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span>{category.name}</span>
                  <span
                    style={{
                      backgroundColor: "#f3f4f6",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      color: "#10b981",
                    }}
                  >
                    {category.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsModalOpen(false)} // Close modal on click
        >
          <img
            src={selectedImage}
            alt="Full View"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "0.5rem",
            }}
          />
        </div>
      )}
    </div>
  );
}
