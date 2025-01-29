import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Head from 'next/head';
import ColorsComponent from "../../../components/Core/Core-Color/CoreColor";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Msmart - Color",
  description:
    "MS- Mart - Color",
};

const ColorsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Colors" />
      <Head>
        <title>Colors</title>
        <meta name="description" content="Manage colors on this page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-10">
        {/* Render the ColorsComponent which handles the data fetching and pagination */}
        <ColorsComponent />
      </div>
    </DefaultLayout>
  );
};

export default ColorsPage;
