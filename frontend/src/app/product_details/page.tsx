import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SingleProductView from "@/components/Dashboard/ProductDetails/Hero/ProductDetailsHero";
import Navbar from "@/components/Dashboard/NavBar/Navbar";
import Footer from "@/components/Dashboard/Footer/Footer";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Product Single view",
};

const InvoicePage = () => {
  return (


      <div>
        <Navbar/>
        <SingleProductView/>
        <Footer/>
      </div>

  );
};

export default InvoicePage;
