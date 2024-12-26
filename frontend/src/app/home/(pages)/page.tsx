"use client";

import React from 'react';

import BestSell from "../../components/BestSell/BestSell";
import Categories from "../../components/Category/Categories";
import DealsOfTheDay from "../../components/DealsOfTheDay/DealsOfTheDay";
import FeaturedProducts from "../..//components/FeaturedProducts/FeaturedProducts";
import Footer from "../..//components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/NavBar/Navbar";
import PopularProducts from "../../components/PopularProducts/PopularProducts";


interface Props {
  children: React.ReactNode;
}

export default function HomePage() {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <Categories />
      {/* <FeaturedProducts /> */}
      <PopularProducts />
      <BestSell />
      <DealsOfTheDay />
      {/* <Footer /> */}
    </div>
  );
}
