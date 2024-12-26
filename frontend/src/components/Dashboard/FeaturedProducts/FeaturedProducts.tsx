import React from 'react';


const products = [
  {
    name: "Organic Orange Juice",
    price: "$4.99",
    oldPrice: "$6.99",
    image: "/images/deals.jpg",
    tag: "Hot",
  },
  {
    name: "All Natural Chicken Noodles",
    price: "$5.25",
    oldPrice: "$7.00",
    image: "/images/deals.jpg",
    tag: "New",
  },
  {
    name: "Angie's Boomchickapop",
    price: "$3.99",
    oldPrice: "$5.50",
    image: "/images/deals.jpg",
    tag: "Sale",
  },
  {
    name: "Farmer's Crispy Chips",
    price: "$2.99",
    oldPrice: "$4.00",
    image: "/images/deals.jpg",
    tag: null,
  },
  // Add more products as needed
];

interface Props {
  children: React.ReactNode;
}

export default function PopularProducts() {
  return (
    <section
      style={{
        padding: "2rem", // Section padding
        backgroundColor: "#FFFFFF", // Background color
      }}
    >
      {/* Section Title */}
      <h2
        style={{
          fontSize: "1.75rem", // Title font size
          fontWeight: "700", // Bold text
          textAlign: "left", // Align left
          marginBottom: "1rem", // Space below title
        }}
      >
        Popular Products
      </h2>

      {/* Products Grid */}
      <div
        style={{
          display: "grid", // Grid layout
          gridTemplateColumns: "repeat(4, 1fr)", // Four columns
          gap: "1rem", // Space between items
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #E5E7EB", // Light border
              borderRadius: "0.5rem", // Rounded corners
              padding: "1rem", // Padding inside the card
              backgroundColor: "#FFFFFF", // White background
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
              textAlign: "center", // Center content
            }}
          >
            {/* Product Tag */}
            {product.tag && (
              <span
                style={{
                  display: "inline-block",
                  backgroundColor:
                    product.tag === "Hot"
                      ? "#F87171" // Red for "Hot"
                      : product.tag === "New"
                      ? "#3B82F6" // Blue for "New"
                      : "#10B981", // Green for "Sale"
                  color: "#FFFFFF", // White text
                  fontSize: "0.75rem", // Small font size
                  fontWeight: "600", // Semi-bold
                  padding: "0.25rem 0.5rem", // Padding inside tag
                  borderRadius: "0.25rem", // Rounded tag
                  position: "absolute", // Position above card
                  top: "1rem",
                  left: "1rem",
                }}
              >
                {product.tag}
              </span>
            )}

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%", // Full width
                height: "150px", // Fixed height
                objectFit: "cover", // Maintain aspect ratio
                borderRadius: "0.25rem", // Slightly rounded edges
                marginBottom: "1rem", // Space below image
              }}
            />

            {/* Product Name */}
            <h3
              style={{
                fontSize: "1rem", // Slightly larger than body text
                fontWeight: "600", // Semi-bold
                marginBottom: "0.5rem", // Space below title
              }}
            >
              {product.name}
            </h3>

            {/* Product Prices */}
            <p
              style={{
                fontSize: "0.875rem", // Small font size
                color: "#10B981", // Green color for current price
                fontWeight: "700", // Bold text
                marginBottom: "0.25rem", // Space below price
              }}
            >
              {product.price}
            </p>
            {product.oldPrice && (
              <p
                style={{
                  fontSize: "0.75rem", // Smaller font for old price
                  color: "#9CA3AF", // Gray text
                  textDecoration: "line-through", // Strikethrough
                }}
              >
                {product.oldPrice}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
