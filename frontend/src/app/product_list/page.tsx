import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProductsList from "@/components/Dashboard/ProductsList/ProductsList";
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
        <ProductsList/>
        <Footer/>
      </div>

  );
};

export default InvoicePage;
