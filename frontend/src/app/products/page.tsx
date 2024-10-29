import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProductsComponent from "@/components/Products/products";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "MS Mart - Products",
  description:
    "MS- Mart - Products",
};

const Product = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products"/>

      <div className="flex flex-col gap-10">
        <ProductsComponent/>
      </div>
    </DefaultLayout>
  );
};

export default Product;
