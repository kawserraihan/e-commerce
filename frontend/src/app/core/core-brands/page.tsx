import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Brands from "@/components/Core/Core-Brand/corebrand";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "MS Mart - Brands",
  description:
    "MS- Mart - Brands",
};

const Categories = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Brands"/>

      <div className="flex flex-col gap-10">
        <Brands/>
      </div>
    </DefaultLayout>
  );
};

export default Categories;
