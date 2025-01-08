"use client";

import React from 'react';
import BestSell from "@/components/BestSell/BestSell";
import Categories from "@/components/Category/Categories";
import PopularProductsSection from '@/components/Dashboard/FeaturedProducts/FeaturedProducts';
import Hero from '@/components/Dashboard/Hero/Hero';
import DealsOfTheDaySection from '@/components/Dashboard/DealsOfTheDay/DealsOfTheDay';

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
      {/* <PopularProductsSection /> */}
      {/* <BestSell /> */}
      {/* <DealsOfTheDaySection /> */}
      {/* <Footer /> */}
    </div>
  );
}
