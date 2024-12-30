'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiUser, FiSearch, FiMapPin } from 'react-icons/fi';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { FaHeadset } from 'react-icons/fa';
import { BsHeadphones } from 'react-icons/bs';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header
      style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        width: '100%',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif',
      }}
    >



  


{/*----------------------------------------------- Top Bar -----------------------------------------------*/}



<div
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
      style={{
        position: "fixed", // Ensures the navbar stays in place
        top: 0, // Sticks to the top
        width: "100%", // Takes full width
        zIndex: 50, // Ensures it is above other content
      }}>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Center both groups horizontally
          alignItems: 'center', // Align items vertically
          padding: '0.5rem 2rem',
          fontSize: '0.750rem', // Adjust font size for better readability
          color: '#6b7280',
          
        }}>
  {/* Inner Container for Centered Content */}
  <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '6rem', // Space between the two sections
        maxWidth: '1300px', // Limit the width of the content
        width: '100%', // Ensure it fills the available space
        height: '1.2rem',
      }}>
    {/* Left Links */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
      <Link
        href="#"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '1rem',
          transition: 'color 0.3s', // Smooth hover effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')} // Hover green
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')} // Revert to gray
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')} // Click dark green
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')} // Revert to hover green
      >
        About Us
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            borderRight: '1.6px solid #d1d5db', // Add light gray border
            transform: 'translateY(-50%)', // Center vertically
          }}
        ></span>
      </Link>

      <Link
        href="#"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '1rem',
          transition: 'color 0.3s', // Smooth hover effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        My Account
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            borderRight: '1.6px solid #d1d5db', // Add light gray border
            transform: 'translateY(-50%)', // Center vertically
          }}
        ></span>
      </Link>

      <Link
        href="#"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '1rem',
          transition: 'color 0.3s', // Smooth hover effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        Wishlist
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            borderRight: '1.6px solid #d1d5db', // Add light gray border
            transform: 'translateY(-50%)', // Center vertically
          }}
        ></span>
      </Link>

      <Link
        href="#"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          transition: 'color 0.3s', // Smooth hover effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        Order Tracking
      </Link>
    </div>

    {/* Right Info */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {/* Phone Number Section */}
      <span
        style={{
          position: 'relative',
          paddingRight: '1rem', // Add padding for spacing
        }}
      >
        Need help? Call Us:{" "}
        <strong style={{ color: '#10b981' }}>+880 160 863 7246</strong>
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%', // Adjust height as needed
            borderRight: '1.6px solid #d1d5db', // Light gray border
            transform: 'translateY(-50%)', // Center vertically
          }}
        ></span>
      </span>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span
          style={{
            position: 'relative',
            paddingRight: '1rem',
          }}
        >
          English
          <span
            style={{
              content: '""',
              position: 'absolute',
              top: '50%',
              right: '0',
              height: '50%',
              borderRight: '1.6px solid #d1d5db',
              transform: 'translateY(-50%)',
            }}
          ></span>
        </span>
        <span>BDT</span>
      </div>
    </div>
  </div>
</div>





{/* --------------------------------------Close Top Nav Bar ----------------------------------------- */}





      {/* Main Navbar */}
      <div
  style={{
    width: '100%',
    borderTop: '1px solid #e5e7eb', // Full-width top border
    
  }}
>
  <div
    style={{
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
    }}
  >
    {/* Logo */}
    <Link href="/">
      <Image
        src="https://demoapi.anticbyte.com/media/banners/msmart.png"
        alt="Nest Logo"
        style={{
          width: '100px', // Reduced logo size
          objectFit: 'contain',
          marginRight: '2rem',
        }}
      />
    </Link>

    {/* Search Bar */}
    <div
    style={{
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      gap: '1rem',
     

  }}
>
  {/* Search Box */}
  <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1px solid ${isFocused ? "#10b981" : "#d1d5db"}`, // Dynamic border color
          borderRadius: "0.375rem",
          overflow: "hidden",
          width: "100%",
          maxWidth: "600px",
          height: "2.2rem", // Reduced height
        }}
      >
        {/* Dropdown */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 0.75rem",
            borderRight: `1px solid ${isFocused ? "#10b981" : "#d1d5db"}`, // Dynamic separator color
            position: "relative", // For the arrow
          }}
        >
          <select
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "0.8rem",
              fontWeight: "bold",
              appearance: "none",
              color: "#374151",
              cursor: "pointer",
              paddingRight: "1.9rem",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <option>All Categories</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Beverages</option>
          </select>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for items..."
          style={{
            flex: 1,
            padding: "0 1rem",
            border: "none",
            outline: "none",
            fontSize: "0.8rem",
            color: "#6b7280",
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Search Button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem 1rem",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            color: isFocused ? "#10b981" : "#6b7280", // Dynamic icon color
          }}
        >
          <FiSearch style={{ fontSize: "1rem" }} />
        </button>
      </div>
  {/* Location Box */}
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      backgroundColor: '#fff',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 2px 4px', // Subtle shadow
      cursor: 'pointer',
      gap: '0.5rem',
    }}
  >
    <FiMapPin style={{ color: '#10b981', fontSize: '1rem' }} />
    <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>Your Location</span>
  </div>
</div>


    {/* Icons */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        marginLeft: '2rem',
        
      }}
    >

      
      {/* Wishlist */}
      <div>
    {/* Wishlist */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <FiHeart style={{ fontSize: '1.2rem', color: '#374151', cursor: 'pointer' }} />
      <Link
        href="/wishlist"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '0.4rem',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        Wishlist
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            transform: 'translateY(-50%)',
          }}
        ></span>
      </Link>
    </div>
    </div>

      {/* Cart */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <FiShoppingCart style={{ fontSize: '1.2rem', color: '#374151', cursor: 'pointer' }} />
      <Link
        href="/cart"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '0.4rem',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        Cart
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            transform: 'translateY(-50%)',
          }}
        ></span>
      </Link>
    </div>

      {/* Account */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <FiUser style={{ fontSize: '1.2rem', color: '#374151', cursor: 'pointer' }} />
      <Link
        href="/account"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '0.4rem',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        Account
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            transform: 'translateY(-50%)',
          }}
        ></span>
      </Link>
    </div>
    </div>
  </div>
</div>

</div>

      {/* --------------------------------------------------Bottom Navbar------------------------------------------ */}

      <nav
      style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0.5rem 2rem',
        fontFamily: 'Arial, sans-serif',
        borderTop: '1px solid #e5e7eb',
        marginTop: "6.8rem",
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Browse Categories */}
        <button
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#10b981',
            color: '#fff',
            borderRadius: '0.375rem',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <HiOutlineMenuAlt4 style={{ fontSize: '1.25rem' }} />
          Browse All Categories
        </button>

        {/* Navigation Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.875rem',
          }}
        >
          <Link
            href="/"
            style={{
              color: '#10b981',
              fontWeight: '600',
              textDecoration: 'none',
              paddingRight: '0.4rem',
            }}
          >
            Home
          </Link>


          <Link
        href="#"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '0.4rem',
          transition: 'color 0.3s', // Smooth hover effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        About
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            transform: 'translateY(-50%)', // Center vertically
          }}
        ></span>
      </Link>

      
      <Link
        href="#"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '0.4rem',
          transition: 'color 0.3s', // Smooth hover effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        Shops
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            transform: 'translateY(-50%)', // Center vertically
          }}
        ></span>
      </Link>

      <Link
        href="#"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '0.4rem',
          transition: 'color 0.3s', // Smooth hover effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        Dealers
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            transform: 'translateY(-50%)', // Center vertically
          }}
        ></span>
      </Link>
      <Link
        href="#"
        style={{
          textDecoration: 'none',
          color: '#6b7280',
          position: 'relative',
          paddingRight: '1rem',
          transition: 'color 0.3s', // Smooth hover effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        onMouseDown={(e) => (e.currentTarget.style.color = '#065f46')}
        onMouseUp={(e) => (e.currentTarget.style.color = '#10b981')}
      >
        Contact Us
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '50%',
            right: '0',
            height: '50%',
            transform: 'translateY(-50%)', // Center vertically
          }}
        ></span>
      </Link>
        </div>

        {/* Support Center */}
        <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '0.9rem',
    fontSize: '0.875rem',
    color: '#374151',
  }}
>
  <FaHeadset style={{ fontSize: '1.65rem', color: '#10b981' }} />
  <div style={{ lineHeight: '1.2' }}> {/* Adjusted line-height */}
    <span
      style={{
        color: '#10b981',
        fontWeight: '600',
        fontSize: '0.70rem',
      }}
    >
      +880 160 863 7246
    </span>
    <br />
    <span
      style={{
        color: '#6b7280',
        fontSize: '0.70rem',
      }}
    >
      24/7 Support Center
    </span>
  </div>
</div>

      </div>
    </nav>


    </header>
  );
}
