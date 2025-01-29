import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Head from 'next/head';
import CategoriesComponent from "../../../components/Core/Core-Categories/CoreCategories";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Msmart - Category",
  description:
    "MS- Mart - Category",
};

const CategoriesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />
      <Head>
        <title>Categories</title>
        <meta name="description" content="Manage categories on this page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-10">
        {/* Render the CategoriesComponent which handles the data fetching and pagination */}
        <CategoriesComponent />
      </div>
    </DefaultLayout>
  );
};

export default CategoriesPage;
