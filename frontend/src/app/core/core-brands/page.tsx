import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import BrandsComponent from "../../../components/Core/Core-Brands/CoreBrands";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MS Mart - Brand",
  description:
    "MS- Mart - Brand",
    
};

const BrandsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Brands" />

      <div className="flex flex-col gap-10">
        {/* Render the BrandsComponent which handles the data fetching and pagination */}
        <BrandsComponent />
      </div>
    </DefaultLayout>
  );
};

export default BrandsPage;
