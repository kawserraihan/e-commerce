import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Orders from "@/components/Orders/orders";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Orders",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const OrdersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />

      <div className="flex flex-col gap-10">
        <Orders/>
      </div>
    </DefaultLayout>
  );
};

export default OrdersPage;
