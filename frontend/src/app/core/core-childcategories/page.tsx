import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Head from 'next/head';
import ChildcategoriesComponent from "@/components/Core/Core-Childcategories/CoreChildCategories";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MS Mart - Child Cateogry",
  description:
    "MS- Mart - Child Category",
};

const ChildcategoryPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Child Category" />
      <Head>
        <title>Child Category</title>
        <meta name="description" content="Manage Child Category on this page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-10">
        {/* Render the ColorsComponent which handles the data fetching and pagination */}
        <ChildcategoriesComponent />
      </div>
    </DefaultLayout>
  );
};

export default ChildcategoryPage;
