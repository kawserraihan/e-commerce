import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProductsComponent from "@/components/Products/products";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedPage from "@/components/ProtectedPage";

export const metadata: Metadata = {
  title: "MS Mart - Products",
  description:
    "MS- Mart - Products",
};

const Product = () => {
  return (
    <ProtectedPage>
      <DefaultLayout>
        <Breadcrumb pageName="Products" />
        <div className="flex flex-col gap-10">
          <ProductsComponent />
        </div>
      </DefaultLayout>
    </ProtectedPage>
  );
};

export default Product;
