"use client";

import CartList from "../../components/Cart/CartList";
import Navbar from "@/components/Dashboard/NavBar/Navbar";
import Footer from "@/components/Dashboard/Footer/Footer";
// import { Metadata } from "next";


// export const metadata: Metadata = {
//   title: "Msmart - Your Cart",
//   description: "MS- Mart - Cart",
// };

export default function CartPage() {
  return (
    
      <div>
        <Navbar />
        <CartList />
        <Footer />
      </div>
    
  );
}
