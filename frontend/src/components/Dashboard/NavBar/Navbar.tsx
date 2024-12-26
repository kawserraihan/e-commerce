import React from 'react';

import Link from "next/link"; // Import Link from Next.js

interface Props {
  children: React.ReactNode;
}

export default function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e7eb",
        width: "100%",
        position: "relative",
        zIndex: 1000,
      }}
    >
      {/* Top Navbar Section */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
        }}
      >
        {/* Logo */}
        <div>
          <img
            src="/images/logo.png"
            alt="Nest Logo"
            style={{ width: "100px", objectFit: "contain" }}
          />
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            marginLeft: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              overflow: "hidden",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <select
              style={{
                padding: "0.75rem",
                border: "none",
                borderRight: "1px solid #d1d5db",
                outline: "none",
                backgroundColor: "#fff",
                fontSize: "0.875rem",
              }}
            >
              <option>All Categories</option>
              <option>Fruits</option>
              <option>Vegetables</option>
              <option>Beverages</option>
            </select>
            <input
              type="text"
              placeholder="Search for items..."
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                outline: "none",
                fontSize: "0.875rem",
              }}
            />
            <button
              style={{
                backgroundColor: "#10b981",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              🔍
            </button>
          </div>
        </div>

        {/* Location */}
        <div style={{ marginLeft: "2rem" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.75rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              fontSize: "0.875rem",
              cursor: "pointer",
              gap: "0.5rem",
            }}
          >
            📍 Your Location
          </button>
        </div>

        {/* Icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginLeft: "2rem",
          }}
        >
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: "1.25rem", color: "#10b981" }}>❤️</span>
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                backgroundColor: "#10b981",
                color: "#fff",
                borderRadius: "50%",
                fontSize: "0.75rem",
                padding: "0.25rem 0.5rem",
                fontWeight: "700",
              }}
            >
              6
            </span>
            <span style={{ marginLeft: "0.5rem", fontSize: "0.875rem" }}>
              Wishlist
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: "1.25rem", color: "#10b981" }}>🛒</span>
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                backgroundColor: "#10b981",
                color: "#fff",
                borderRadius: "50%",
                fontSize: "0.75rem",
                padding: "0.25rem 0.5rem",
                fontWeight: "700",
              }}
            >
              2
            </span>
            <Link
              href="/add-to-cart" // Use href for Next.js routing
              style={{
                marginLeft: "0.5rem",
                fontSize: "0.875rem",
                textDecoration: "none", // Optional: Remove underline
                color: "#374151", // Optional: Set link color
              }}
            >
              Cart
            </Link>
          </div>
          <div>
            <span style={{ fontSize: "1.25rem", color: "#374151" }}>👤</span>
            <span style={{ marginLeft: "0.5rem", fontSize: "0.875rem" }}>
              Account
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Navbar Section */}
      <nav
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderTop: "1px solid #e5e7eb",
          padding: "0.5rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
          }}
        >
          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10b981",
              color: "#fff",
              borderRadius: "0.375rem",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            📂 Browse All Categories
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              fontSize: "0.875rem",
            }}
          >
            <a href="#" style={{ color: "#374151", textDecoration: "none" }}>
              Deals
            </a>
            <Link
              href="/" // Set Home link to the root page
              style={{
                color: "#10b981",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Home
            </Link>
            <a href="#" style={{ color: "#374151", textDecoration: "none" }}>
              About
            </a>
            <a href="#" style={{ color: "#374151", textDecoration: "none" }}>
              Shop
            </a>
            <a href="#" style={{ color: "#374151", textDecoration: "none" }}>
              Vendors
            </a>
            <a href="#" style={{ color: "#374151", textDecoration: "none" }}>
              Mega Menu
            </a>
            <a href="#" style={{ color: "#374151", textDecoration: "none" }}>
              Blog
            </a>
            <a href="#" style={{ color: "#374151", textDecoration: "none" }}>
              Pages
            </a>
            <a href="#" style={{ color: "#374151", textDecoration: "none" }}>
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
