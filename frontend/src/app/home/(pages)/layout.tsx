import React from 'react';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/Navbar";
import { CartProvider } from "../../context/CartContext";

// import "../styles/globals.css"; // Ensure you import global styles if needed

export const metadata = {
  title: "Next E-Com",
  description: "An amazing Next.js application",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap your application with necessary providers */}
        <CartProvider>
          <div>
            <Navbar />

            {/* Add your global header or navigation here if needed */}
            {children}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
