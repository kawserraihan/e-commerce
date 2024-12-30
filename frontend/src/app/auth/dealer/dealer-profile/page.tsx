import React from "react";

import "react-toastify/dist/ReactToastify.css";
import { SellerProfileForm } from '@/components/forms';

export const metadata = {
  title: "Seller Profile| MS Mart",
  description: "Seller Profile | MS Mart",
};

const Seller: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark w-[700px]">
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Setup Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Fill up the form, It is required for approval.
          </p>
          <div className="mt-6">
            <SellerProfileForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
