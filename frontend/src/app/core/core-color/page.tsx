import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Colors from "@/components/Core/Core-Color/CoreColor";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "MS Mart - Core Data - Color",
  description:
    "MS- Mart - Core Data - Color",
};

const Color = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Colors"/>

      <div className="flex flex-col gap-10">
        <Colors/>
      </div>
    </DefaultLayout>
  );
};

export default Color;
