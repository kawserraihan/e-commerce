"use client";
import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        padding: "3rem 1rem", // Adjust padding for responsiveness
        fontFamily: "Arial, sans-serif",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      {/* Footer Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Responsive grid
          gap: "2rem", // Adjust gap for better spacing
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* MSmart Info Section */}
        <div>
          <Image
            src="https://demoapi.anticbyte.com/media/banners/msmart.png"
            alt="MSmart Logo"
            width={150}
            height={50}
          />
          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
            <li style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "0.5rem" }}>About Us</li>
            <li style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "0.5rem" }}>Job Circular</li>
          </ul>
          <h4 style={{ fontSize: "1rem", fontWeight: "600", marginTop: "1rem", color: "#059669" }}>
            Social Links
          </h4>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <a href="#"><Image src="https://demoapi.anticbyte.com/media/footer/facebook.png" alt="Facebook" width={30} height={30} /></a>
            <a href="#"><Image src="https://demoapi.anticbyte.com/media/footer/twitter.png" alt="Twitter" width={30} height={30} /></a>
            <a href="#"><Image src="https://demoapi.anticbyte.com/media/footer/youtube.png" alt="YouTube" width={30} height={30} /></a>
            <a href="#"><Image src="https://demoapi.anticbyte.com/media/footer/instagram.png" alt="Instagram" width={30} height={30} /></a>
            <a href="#"><Image src="https://demoapi.anticbyte.com/media/footer/tiktok.png" alt="TikTok" width={30} height={30} /></a>
          </div>
        </div>

        {/* Earn With MSmart Section */}
        <div>
          <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#059669" }}>
            Earn With MSmart
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>My Account / Login</li>
            <li style={{ marginBottom: "0.5rem" }}>Be a MSmart Seller</li>
            <li style={{ marginBottom: "0.5rem" }}>Be a MSmart Dealer</li>
            <li style={{ marginBottom: "0.5rem" }}>Be a MSmart Affiliate</li>
          </ul>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play Store"
              width={120}
              height={60}
            />
            <Image
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              width={120}
              height={40}
            />
          </div>
        </div>

        {/* Our Policy Section */}
        <div>
          <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#059669" }}>
            Our Policy
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>How To Order</li>
            <li style={{ marginBottom: "0.5rem" }}>Track Your Orders</li>
            <li style={{ marginBottom: "0.5rem" }}>Terms And Conditions</li>
            <li style={{ marginBottom: "0.5rem" }}>Privacy & Policy</li>
            <li style={{ marginBottom: "0.5rem" }}>Return & Return Policy</li>
            <li style={{ marginBottom: "0.5rem" }}>FAQ</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", color: "#059669" }}>
            Contact Us
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>Hotline</li>
            <li style={{ marginBottom: "0.5rem" }}>WhatsApp</li>
            <li style={{ marginBottom: "0.5rem" }}>Email</li>
            <li style={{ marginBottom: "0.5rem" }}>Head Office</li>
          </ul>
          <h4 style={{ fontSize: "1rem", fontWeight: "600", marginTop: "1rem", color: "#059669" }}>
            Accept Payment
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "0.5rem" }}>
            <Image
              src="https://demoapi.anticbyte.com/media/footer/bkash.svg"
              alt="Bkash"
              width={60}
              height={30}
            />
            <Image
              src="https://demoapi.anticbyte.com/media/footer/nagad.svg"
              alt="Nagad"
              width={60}
              height={30}
            />
            <Image
              src="https://demoapi.anticbyte.com/media/footer/rocket.svg"
              alt="Rocket"
              width={60}
              height={30}
            />
            <Image
              src="https://demoapi.anticbyte.com/media/footer/nexuspay.svg"
              alt="NexusPay"
              width={60}
              height={30}
            />
            <Image
              src="https://demoapi.anticbyte.com/media/footer/mastercard.svg"
              alt="MasterCard"
              width={60}
              height={30}
            />
            <Image
              src="https://demoapi.anticbyte.com/media/footer/visa.svg"
              alt="Visa"
              width={60}
              height={30}
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center the footer text on smaller screens
          alignItems: "center",
          marginTop: "2rem",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1rem",
          textAlign: "center", // Text will align properly on small screens
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          © 2022 MSmart - All rights reserved. Incorporation-No.C-192249/2023. DBID: ........ e-CAB: ........
        </p>
      </div>
    </footer>
  );
}
