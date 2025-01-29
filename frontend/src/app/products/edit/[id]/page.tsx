
import EditProductPage from "@/components/Products/EditProduct";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Msmart - Edit Product",
  description:
    "MS- Mart - Edit Product",
};

const ProductPage = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Products" />
      <div className="flex flex-col gap-10">
        <EditProductPage />
      </div>
    </DefaultLayout>
  )
};

export default ProductPage;