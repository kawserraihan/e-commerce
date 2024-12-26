import React from 'react';


const categories = [
  { name: "Cake & Milk", image: "/images/deals.jpg", items: "25 items" },
  { name: "Organic Fruits", image: "/images/deals.jpg", items: "32 items" },
  { name: "Fresh Vegetables", image: "/images/deals.jpg", items: "20 items" },
  { name: "Snack", image: "/images/deals.jpg", items: "10 items" },
  { name: "Strawberry", image: "/images/deals.jpg", items: "25 items" },
  { name: "Black Plum", image: "/images/deals.jpg", items: "15 items" },
  { name: "Custard Apple", image: "/images/deals.jpg", items: "18 items" },
  { name: "Coffee & Tea", image: "/images/deals.jpg", items: "10 items" },
];

interface Props {
  children: React.ReactNode;
}

export default function Categories() {
  return (
    <section
      style={{
        padding: "2rem",
        backgroundColor: "#FFFFFF",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Section Title */}
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          textAlign: "left",
          marginBottom: "2rem",
          color: "#111827",
        }}
      >
        Featured Categories
      </h2>

      {/* Scrollable Categories */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto", // Enables horizontal scrolling
          paddingBottom: "1rem",
          scrollbarWidth: "none", // Hides scrollbar in Firefox
        }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              minWidth: "150px", // Ensures consistent card width
              textAlign: "center",
              padding: "1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#F9FAFB",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
              transition: "transform 0.2s ease", // Smooth hover effect
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {/* Category Image */}
            <img
              src={category.image}
              alt={category.name}
              style={{
                width: "3rem",
                height: "3rem",
                marginBottom: "0.75rem",
                borderRadius: "50%", // Circular image
              }}
            />
            {/* Category Name */}
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                marginBottom: "0.25rem",
                color: "#111827",
              }}
            >
              {category.name}
            </p>
            {/* Category Items */}
            <p
              style={{
                fontSize: "0.75rem",
                color: "#6B7280",
              }}
            >
              {category.items}
            </p>
          </div>
        ))}
      </div>

      {/* Banner Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#FDE68A",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            textAlign: "left",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#111827",
            }}
          >
            Everyday Fresh & Clean with Our Products
          </h3>
          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10B981",
              color: "#FFFFFF",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Shop Now
          </button>
        </div>
        <div
          style={{
            backgroundColor: "#E0F2FE",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            textAlign: "left",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#111827",
            }}
          >
            Make your Breakfast Healthy and Easy
          </h3>
          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10B981",
              color: "#FFFFFF",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Shop Now
          </button>
        </div>
        <div
          style={{
            backgroundColor: "#D1FAE5",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            textAlign: "left",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              color: "#111827",
            }}
          >
            The Best Organic Products Online
          </h3>
          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10B981",
              color: "#FFFFFF",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
