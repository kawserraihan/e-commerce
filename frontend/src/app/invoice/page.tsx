import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Invoice from "@/components/Orders/Invoice/invoice";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Msmart - Invoice",
  description:
    "invoice",
};

const InvoicePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Invoice" />

      <div className="flex flex-col gap-10">
        <Invoice/>
      </div>
    </DefaultLayout>
  );
};

export default InvoicePage;
