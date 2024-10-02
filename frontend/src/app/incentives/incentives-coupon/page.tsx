import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Coupon from "@/components/Incentives/Incentives-Coupon/coupon";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "MS Mart - Coupon",
  description:
    "MS- Mart - Coupon",
};

const Coupons = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Coupon"/>

      <div className="flex flex-col gap-10">
        <Coupon/>
      </div>
    </DefaultLayout>
  );
};

export default Coupons;
