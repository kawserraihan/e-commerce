
"use client";

import ProductDetailsHero from "../../../components/ProductDetails/Hero/ProductDetailsHero";
import ProductDescription from "../../../components/ProductDetails/ProductDescription/ProductDescription";
import RelatedProducts from "../../../components/ProductDetails/RelatedProducts/RelatedProducts";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function HomePage() {
  return (
    <div>
      <ProductDetailsHero />
      <ProductDescription />
      <RelatedProducts />
    </div>
  );
}
