
import OrderView from "../../../components/Orders/OrderView";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



export const metadata: Metadata = {
  title: "MS Mart - Product",
  description:
    "MS- Mart - Product",
};

const ProductPage = ({ params }: { params: { id: string } }) => {
  return (

    <DefaultLayout>
      <OrderView />
    </DefaultLayout>

  );
};


export default ProductPage;