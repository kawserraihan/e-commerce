import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Subcategory from "@/components/Core/Core-Subcategories/CoreSubcategories";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "MS Mart - Subcategory",
  description:
    "MS- Mart - Subcategory",
};

const Subcategories = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sub-Categories"/>

      <div className="flex flex-col gap-10">
        <Subcategory/>
      </div>
    </DefaultLayout>
  );
};

export default Subcategories;
