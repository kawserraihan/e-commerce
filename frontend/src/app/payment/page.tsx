import { Metadata } from "next";

import Footer from "@/components/Dashboard/Footer/Footer";

import Navbar from "@/components/Dashboard/NavBar/Navbar";

import PaymentStatus from "@/components/Payment/Successful";



export const metadata: Metadata = {
  title:
    "Msmart",
  description: "Msmart Admin Panel",
};

export default function Home() {


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar/>
    <PaymentStatus/>
      <Footer/>


    </div>
  )
}
