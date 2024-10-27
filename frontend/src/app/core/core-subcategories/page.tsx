import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Head from 'next/head';
import SubcategoriesComponent from "@/components/Core/Core-Subcategories/CoreSubcategories";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MS Mart - SubCategory",
  description:
    "MS- Mart - SubCategory",
};

const SubcategoriesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="SubCategory" />
      <Head>
        <title>SubCategory</title>
        <meta name="description" content="Manage Subcategories on this page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-10">
        {/* Render the SubcategoriesComponent which handles the data fetching and pagination */}
        <SubcategoriesComponent />
      </div>
    </DefaultLayout>
  );
};

export default SubcategoriesPage;
