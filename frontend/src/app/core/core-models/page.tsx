import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ModelsComponent from "../../../components/Core/Core-Models/CoreModels";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MS Mart - Model",
  description:
    "MS- Mart - Model",
    
};

const ModelsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Models" />

      <div className="flex flex-col gap-10">
        {/* Render the ModelsComponent which handles the data fetching and pagination */}
        <ModelsComponent />
      </div>
    </DefaultLayout>
  );
};

export default ModelsPage;
