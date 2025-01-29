import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SizesComponent from "@/components/Core/Core-Size/CoreSize";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Msmart - Size",
  description:
    "MS- Mart - Size",
};

const Color = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Size"/>

      <div className="flex flex-col gap-10">
        <SizesComponent/>
      </div>
    </DefaultLayout>
  );
};

export default Color;
