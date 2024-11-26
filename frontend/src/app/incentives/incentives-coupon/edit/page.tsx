import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CouponsComponent from "@/components/Incentives/Incentives-Coupon/coupon";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "MS Mart - Coupons",
  description:
    "MS- Mart - Coupons",
};

const Coupon = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Coupons"/>

      <div className="flex flex-col gap-10">
        <CouponsComponent/>
      </div>
    </DefaultLayout>
  );
};

export default Coupon;
