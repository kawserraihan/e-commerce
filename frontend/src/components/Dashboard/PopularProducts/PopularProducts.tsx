import React from 'react';


const products = [
  {
    name: "Organic Orange Juice",
    price: "$4.99",
    image: "/images/deals.jpg",
  },
  { name: "Fresh Apples", price: "$3.49", image: "/images/deals.jpg" },
  { name: "Healthy Snacks", price: "$5.99", image: "/images/deals.jpg" },
  { name: "Snacks", price: "$5.99", image: "/images/deals.jpg" },
  {
    name: "Organic Orange Juice",
    price: "$4.99",
    image: "/images/deals.jpg",
  },
  { name: "Fresh Apples", price: "$3.49", image: "/images/deals.jpg" },
  { name: "Healthy Snacks", price: "$5.99", image: "/images/deals.jpg" },
  { name: "Snacks", price: "$5.99", image: "/images/deals.jpg" },
  { name: "Fresh Apples", price: "$3.49", image: "/images/deals.jpg" },
  { name: "Healthy Snacks", price: "$5.99", image: "/images/deals.jpg" },
  // Add more products as needed
];

interface Props {
  children: React.ReactNode;
}

export default function PopularProducts() {
  return (
    <section
      style={{
        padding: "3rem 1.5rem", // Adds padding to the section
        backgroundColor: "#F9FAFB", // Light background color for the section
        fontFamily: "Arial, sans-serif", // Clean and professional font family
      }}
    >
      <h2
        style={{
          fontSize: "2rem", // Larger font size for the title
          fontWeight: "700", // Bold font for the title
          textAlign: "center", // Center-align the title
          marginBottom: "2rem", // Space below the title
          color: "#111827", // Dark text color for better readability
        }}
      >
        Popular Products
      </h2>
      <div
        style={{
          display: "grid", // Use grid layout for the products
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive grid columns
          gap: "1.5rem", // Spacing between product cards
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              padding: "1rem", // Padding inside the card
              border: "1px solid #E5E7EB", // Light gray border for cards
              borderRadius: "0.5rem", // Rounded corners for a modern look
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              backgroundColor: "#FFFFFF", // White background for cards
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
              cursor: "pointer", // Pointer cursor for interactivity
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 6px 10px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%", // Full width image
                height: "150px", // Fixed height for consistent layout
                objectFit: "cover", // Ensures image doesn't distort
                borderRadius: "0.5rem", // Matches card's rounded corners
                marginBottom: "1rem", // Space below the image
              }}
            />
            <h3
              style={{
                fontSize: "1.25rem", // Slightly larger font size for product name
                fontWeight: "600", // Semi-bold text for emphasis
                color: "#111827", // Dark text color
                marginBottom: "0.5rem", // Space below product name
              }}
            >
              {product.name}
            </h3>
            <p
              style={{
                color: "#10B981", // Green color for the price
                fontWeight: "700", // Bold text for visibility
                fontSize: "1rem", // Font size for price
              }}
            >
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
