import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Stocks from "@/components/Stock/Stock";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Stock",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const InvoicePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Stock" />

      <div className="flex flex-col gap-10">
        <Stocks/>
      </div>
    </DefaultLayout>
  );
};

export default InvoicePage;
