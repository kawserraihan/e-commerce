import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddCouponModal from '@/components/Incentives/Incentives-Coupon/coupon';

export const metadata: Metadata = {
    title: "MS Mart - Coupons",
    description:
      "MS- Mart - Coupons",
  };

const AddProductPageWrapper = () => {
  return (
    <DefaultLayout>

    <Breadcrumb pageName="Add Coupons"/>

    <div className="flex flex-col gap-10">
        <AddCouponModal/>
      </div>


    </DefaultLayout>
    
  );
};

export default AddProductPageWrapper;