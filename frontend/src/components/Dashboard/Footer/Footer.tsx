import React from 'react';


interface Props {
  children: React.ReactNode;
}

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f9f9f9",
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
            description: "Orders $50 or more",
          },
          {
            icon: "🚚",
            title: "Free delivery",
            description: "24/7 amazing services",
          },
          {
            icon: "💸",
            title: "Great daily deal",
            description: "When you sign up",
          },
          {
            icon: "🛍️",
            title: "Wide assortment",
            description: "Mega Discounts",
          },
          {
            icon: "🔄",
            title: "Easy returns",
            description: "Within 30 days",
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

      {/* Footer Links */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "2rem",
        }}
      >
        {/* About Section */}
        <div>
          <img
            src="/images/logo.png"
            alt="Nest Logo"
            style={{ width: "120px", marginBottom: "1rem" }}
          />
          <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
            Awesome grocery store website template
          </p>
          <address style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            <p>Address: 5171 W Campbell Ave, Kent, UT 53127 United States</p>
            <p>
              Email:{" "}
              <a
                href="mailto:email@example.com"
                style={{ color: "#10b981", textDecoration: "none" }}
              >
                email@example.com
              </a>
            </p>
            <p>Phone: +91 (0) 123-456789</p>
            <p>Hours: 10:00 - 18:00, Mon - Sat</p>
          </address>
        </div>

        {/* Dynamic Links Sections */}
        {[
          {
            title: "Company",
            links: [
              "About Us",
              "Delivery Information",
              "Privacy Policy",
              "Terms & Conditions",
              "Contact Us",
              "Careers",
            ],
          },
          {
            title: "Account",
            links: [
              "Sign In",
              "View Cart",
              "My Wishlist",
              "Track My Order",
              "Help Ticket",
              "Shipping Details",
            ],
          },
          {
            title: "Corporate",
            links: [
              "Become a Vendor",
              "Affiliate Program",
              "Farm Business",
              "Our Suppliers",
              "Accessibility",
              "Promotions",
            ],
          },
          {
            title: "Popular",
            links: [
              "Milk & Flavoured Milk",
              "Butter and Margarine",
              "Egg Substitutes",
              "Marmalades",
              "Sour Cream and Dips",
              "Tea & Kombucha",
            ],
          },
        ].map((section, index) => (
          <div key={index}>
            <h4
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "#111827",
              }}
            >
              {section.title}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {section.links.map((link, i) => (
                <li
                  key={i}
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
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "3rem",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1.5rem",
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          © 2022 Nest - HTML Ecommerce Template. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="#">
            <img
              src="/images/appstore.png"
              alt="App Store"
              style={{ width: "120px" }}
            />
          </a>
          <a href="#">
            <img
              src="/images/playstore.png"
              alt="Play Store"
              style={{ width: "120px" }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
