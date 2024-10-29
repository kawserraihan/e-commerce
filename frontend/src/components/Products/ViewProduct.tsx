'use client';

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetProductByIdQuery } from "../../../redux/features/authApiSlice";
import { useState, useEffect } from "react";

// Receiving `params` as a prop in App Router (Next.js 13)
const ViewProduct = ({ params }: { params: { id: string } }) => {
  const productId = parseInt(params.id, 10);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Call the query only if productId is valid
  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId, {
    skip: isNaN(productId), // Skip the query if productId is not valid
  });

  // If product_image is a File, create an object URL for it
  useEffect(() => {
    if (product?.product_image instanceof File) {
      const objectUrl = URL.createObjectURL(product.product_image);
      setImageSrc(objectUrl);

      // Clean up the object URL when the component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof product?.product_image === "string") {
      setImageSrc(product.product_image); // For string URLs
    }
  }, [product?.product_image]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error fetching product data.</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        {/* Create a grid layout with two columns: one for the image and one for the product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left column for the product image */}
          {imageSrc && (
            <div className="flex justify-center items-center">
              <img
                src={imageSrc} // Use the URL created by URL.createObjectURL
                alt={product.product_name}
                className="w-full max-w-md object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Right column for the product details */}
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex arcu, tincidunt bibendum felis.
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-red-500">{product.price}</span>
            </div>

            {/* Category */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Category Name</h2>
              <p>{product.category_name}</p>
            </div>

            {/* Subcategory */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">SubCategory Name</h2>
              <p>{product.subcategory_name}</p>
            </div>

            {/* ChildCategory */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">ChildCategory Name</h2>
              <p>{product.childcategory_name}</p>
            </div>

            {/* Status */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Status</h2>
              <p>{product.is_active ? 'Active' : 'Inactive'}</p>
            </div>

            {/* Created At */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Created At</h2>
              <p>{new Date(product.created_at).toLocaleString()}</p>
            </div>

            {/* Modified At */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Modified At</h2>
              <p>{new Date(product.modified_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewProduct;
