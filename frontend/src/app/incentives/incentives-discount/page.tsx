import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Discounts from "@/components/Incentives/Incentives-Discount/discount";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Msmart - Discount Products",
  description:
    "MS- Mart - Discount Products",
};

const Discount = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Discount Products"/>

      <div className="flex flex-col gap-10">
        <Discounts/>
      </div>
    </DefaultLayout>
  );
};

export default Discount;
