import { Metadata } from "next";

import Stores from "@/components/Dashboard/Store/Stores"
import DealsOfTheDay from "@/components/Dashboard/DealsOfTheDay/DealsOfTheDay";
import PopularProducts from "@/components/Dashboard/PublicProducts/FeaturedProducts";
import Footer from "@/components/Dashboard/Footer/Footer";
import Hero from "@/components/Dashboard/Hero/Hero";
import Navbar from "@/components/Dashboard/NavBar/Navbar";



export const metadata: Metadata = {
  title:
    "Msmart",
  description: "Msmart Admin Panel",
};

export default function Home() {


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar/>
      <Hero/>
      <Stores/>
      <PopularProducts/>
      <DealsOfTheDay/>

      <Footer/>


    </div>
  )
}
