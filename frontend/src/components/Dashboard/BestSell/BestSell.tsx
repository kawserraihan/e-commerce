import React from 'react';


const products = [
  {
    name: "All Natural Italian-Style Chicken Meatballs",
    price: "$23.85",
    originalPrice: "$24.85",
    image: "/images/deals.jpg",
    tag: "Save 5%",
    sold: "90/120",
  },
  {
    name: "Angie's Boomchickapop Sweet and Salty",
    price: "$23.85",
    originalPrice: "$24.85",
    image: "/images/deals.jpg",
    tag: "Sale",
    sold: "90/120",
  },
  {
    name: "Foster Farms Takeout Crispy Classic",
    price: "$23.85",
    originalPrice: "$24.85",
    image: "/images/deals.jpg",
    tag: "Best seller",
    sold: "90/120",
  },
  {
    name: "Blue Diamond Almonds Lightly Salted",
    price: "$23.85",
    originalPrice: "$24.85",
    image: "/images/deals.jpg",
    tag: "Save 15%",
    sold: "90/120",
  },
  {
    name: "Blue Diamond Almonds Lightly Salted",
    price: "$23.85",
    originalPrice: "$24.85",
    image: "/images/deals.jpg",
    tag: "Save 15%",
    sold: "90/120",
  },
  {
    name: "Blue Diamond Almonds Lightly Salted",
    price: "$23.85",
    originalPrice: "$24.85",
    image: "/images/deals.jpg",
    tag: "Save 15%",
    sold: "90/120",
  },
];

interface Props {
  children: React.ReactNode;
}

export default function BestSell() {
  return (
    <section
      style={{
        padding: "2.5rem 1rem",
        backgroundColor: "#FFFFFF",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#111827",
        }}
      >
        Daily Best Sells
      </h2>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto", // Enables horizontal scrolling
          paddingBottom: "1rem",
          scrollbarWidth: "none", // Hides scrollbar for Firefox
          msOverflowStyle: "none", // Hides scrollbar for IE and Edge
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 240px", // Ensures fixed-width cards
              border: "1px solid #E5E7EB",
              borderRadius: "0.375rem",
              padding: "1rem",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              position: "relative",
              backgroundColor: "#FFFFFF",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span
              style={{
                position: "absolute",
                top: "0.5rem",
                left: "0.5rem",
                backgroundColor: "#F43F5E",
                color: "#FFFFFF",
                padding: "0.25rem 0.5rem",
                fontSize: "0.75rem",
                borderRadius: "0.25rem",
                fontWeight: "600",
              }}
            >
              {product.tag}
            </span>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "0.375rem",
                marginBottom: "0.75rem",
              }}
            />
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#111827",
              }}
            >
              {product.name}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  color: "#10B981",
                  fontWeight: "700",
                  fontSize: "1rem",
                }}
              >
                {product.price}
              </span>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#6B7280",
                  fontSize: "0.875rem",
                }}
              >
                {product.originalPrice}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6B7280",
                marginBottom: "1rem",
              }}
            >
              Sold: {product.sold}
            </p>
            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#10B981",
                color: "#FFFFFF",
                fontSize: "1rem",
                fontWeight: "700",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <style>
        {`
          /* Hide the scrollbar in WebKit browsers (Chrome, Safari, Edge) */
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
}
