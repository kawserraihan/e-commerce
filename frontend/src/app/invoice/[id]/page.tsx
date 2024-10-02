import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InvoiceView from "@/components/Orders/Invoice/invoiceView";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Invoice",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const InvoicePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Invoice" />

      <div className="flex flex-col gap-10">
        <InvoiceView/>
      </div>
    </DefaultLayout>
  );
};

export default InvoicePage;
