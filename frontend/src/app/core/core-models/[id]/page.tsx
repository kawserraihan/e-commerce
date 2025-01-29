
import ViewModel from "@/components/Core/Core-Models/ViewModel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Msmart - Model",
  description:
    "MS- Mart - Brand",
};

const ModelsPage = ({ params }: { params: { id: string } }) => {
  return <ViewModel params={params} />;
};

export default ModelsPage;