
import ViewProduct from "../../../components/Products/ViewProduct";

import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Msmart - Product",
  description:
    "MS- Mart - Product",
};

const ProductPage = ({ params }: { params: { id: string } }) => {
  return <ViewProduct params={params}/>;
};

export default ProductPage;