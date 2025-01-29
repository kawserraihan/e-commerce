
import ViewBrand from "../../../../components/Core/Core-Brands/ViewBrand";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Msmart - Brand",
  description:
    "MS- Mart - Brand",
};

const BrandPage = ({ params }: { params: { id: string } }) => {
  return <ViewBrand params={params} />;
};

export default BrandPage;