'use client'
import SingleProductView from "@/components/Dashboard/ProductDetails/Hero/ProductDetailsHero";
import Navbar from "@/components/Dashboard/NavBar/Navbar";
import Footer from "@/components/Dashboard/Footer/Footer";


// import { Metadata } from "next";
import { useParams } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Product",
//   description:
//     "Product Single view",
// };

const InvoicePage = () => {
  const { id } = useParams()
  console.log(id);

  return (
    <div>
      <Navbar />
      <SingleProductView id={id} />
      <Footer />
    </div>
  );
};

export default InvoicePage;
