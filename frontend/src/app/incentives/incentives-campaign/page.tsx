import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Campaign from "@/components/Incentives/Incentives-Campaign/campaign";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "MS Mart - Campaign",
  description:
    "MS- Mart - Campaign",
};

const Campaigns = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Campaign"/>

      <div className="flex flex-col gap-10">
        <Campaign/>
      </div>
    </DefaultLayout>
  );
};

export default Campaigns;
