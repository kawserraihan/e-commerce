import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Products from "@/components/Products/products";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Products",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ProductPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
        <Products/>
      </div>
    </DefaultLayout>
  );
};

export default ProductPage;
