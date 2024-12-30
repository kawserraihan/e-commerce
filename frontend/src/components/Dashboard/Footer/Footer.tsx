"use client"
import React from 'react';
import Image from 'next/image';


interface Props {
  children: React.ReactNode;
}

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        padding: "3rem 2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Subscription Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#e6f7e9",
          padding: "2rem",
          borderRadius: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              color: "#111827",
            }}
          >
            Stay home & get your daily needs from our shop
          </h3>
          <p style={{ fontSize: "1rem", color: "#6b7280" }}>
            Start Your Daily Shopping with <strong>Nest Mart</strong>
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{
              padding: "1rem",
              borderRadius: "50px",
              border: "1px solid #d1d5db",
              width: "300px",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        {[
          {
            icon: "🛒",
            title: "Best prices & offers",
            description: "Order Now",
          },
          {
            icon: "🚚",
            title: "Home delivery",
            description: "24/7 amazing services",
          },
          {
            icon: "💸",
            title: "Great daily deal",
            description: "Everyday Discounts",
          },
          {
            icon: "🛍️",
            title: "Wide assortment",
            description: "Mega Discounts",
          },
          {
            icon: "🔄",
            title: "Easy returns",
            description: "Based On Products",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "#10b981",
              }}
            >
              {item.icon}
            </div>
            <h4
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#111827",
              }}
            >
              {item.title}
            </h4>
            <p style={{ fontSize: "1rem", color: "#6b7280" }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>


      {/* Footer Bottom */}
      <div className="px-6 py-4 bg-white">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
        }}
      >
        {/* MSmart Info Section */}
        <div>
          <Image
            src="https://demoapi.anticbyte.com/media/banners/msmart.png"
            alt="MSmart Logo"
            style={{ width: "150px", marginBottom: "1rem" }}
          />
          <address style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            <p>+880 1877 716660</p>
            <p>
              Email: <a href="mailto:info@msmart.shop" style={{ color: "#10b981", textDecoration: "none" }}>info@msmart.shop</a>
            </p>
            <p>বাড়ি # ৩১, রোড # ০৯, সেক্টর # ১৫, উত্তরা, ঢাকা-১২৩০</p>
          </address>
        </div>

        {/* Earn With MSmart Section */}
        <div>
          <h4
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#111827",
            }}
          >
            Earn With MSmart
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "Be a MSmart Seller",
              "Be a MSmart Dealer",
              "MSmart Affiliate Program",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "0.5rem",
                }}
              >
                <a
                  href="#"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Policy/Customer Service Section */}
        <div>
          <h4
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#111827",
            }}
          >
            Our Policy/Customer Service
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "About Us",
              "Go to Contact Us/Write your Opinion",
              "How To Order",
              "Track Your Orders",
              "Terms And Conditions",
              "Privacy & Policy",
              "Return & Return policy",
              "FAQ",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "0.5rem",
                }}
              >
                <a
                  href="#"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us/Help Center Section */}
        <div>
          <h4
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#111827",
            }}
          >
            Contact Us/Help Center
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "Hotline",
              "WhatsApp",
              "Email",
              "Head Office",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "0.5rem",
                }}
              >
                <a
                  href="#"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1rem",
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          © 2022 MSmart - All rights reserved.
        </p>
      </div>
    </div>
    </footer>
  );
}
