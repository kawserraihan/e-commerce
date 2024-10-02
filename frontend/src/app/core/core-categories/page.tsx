import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Category from "@/components/Core/Core-Categories/CoreCategories";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "MS Mart - Category",
  description:
    "MS- Mart - Category",
};

const Categories = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories"/>

      <div className="flex flex-col gap-10">
        <Category/>
      </div>
    </DefaultLayout>
  );
};

export default Categories;
