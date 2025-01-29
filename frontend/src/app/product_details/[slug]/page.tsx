"use client";

import SingleProductView from "@/components/Dashboard/ProductDetails/Hero/ProductDetailsHero";
import Navbar from "@/components/Dashboard/NavBar/Navbar";
import Footer from "@/components/Dashboard/Footer/Footer";
import { useParams } from "next/navigation";


const ProductDetailsPage = () => {
  // Get slug from URL params
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  // Ensure slug is properly defined
  if (!slug) {
    return <div className="text-center text-red-500">Invalid product details</div>;
  }

  return (
   
      <div>
        <Navbar />
        <SingleProductView slug={slug} />
        <Footer />
      </div>

  );
};

export default ProductDetailsPage;
