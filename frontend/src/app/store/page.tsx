import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProductsByStore from "@/components/Dashboard/Store/ProductsByStore";
import Navbar from "@/components/Dashboard/NavBar/Navbar";
import Footer from "@/components/Dashboard/Footer/Footer";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products By Store",
  description:
    "Product Single view",
};

const StorePage = () => {
  return (


      <div>
        <Navbar/>
        <ProductsByStore/>
        <Footer/>
      </div>

  );
};

export default StorePage;
