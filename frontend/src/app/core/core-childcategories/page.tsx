import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChildCategory from "@/components/Core/Core-Childcategories/CoreChildCategories";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "MS Mart - Child Category",
  description:
    "MS- Mart - Child Category",
};

const Color = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Child Category"/>

      <div className="flex flex-col gap-10">
        <ChildCategory/>

      </div>
    </DefaultLayout>
  );
};

export default Color;
