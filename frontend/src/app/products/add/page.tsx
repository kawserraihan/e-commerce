import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddProduct from '@/components/Products/AddProduct';


const AddProductPageWrapper = () => {
  return (
    <DefaultLayout>

    <Breadcrumb pageName="Add Products"/>

    <div className="flex flex-col gap-10">
        <AddProduct/>
      </div>


    </DefaultLayout>
    
  );
};

export default AddProductPageWrapper;