'use client';

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetProductByIdQuery } from "../../../redux/features/authApiSlice";
import { useState, useEffect } from "react";

// Receiving `params` as a prop in App Router (Next.js 13)
const ViewProduct = ({ params }: { params: { id: string } }) => {
  const productId = parseInt(params.id, 10);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  // Call the query only if productId is valid
  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId, {
    skip: isNaN(productId), // Skip the query if productId is not valid
  });

  useEffect(() => {
    if (product) {
      // Use main image URL if it's a string
      const mainImage = typeof product.product_image === 'string' ? product.product_image : '';
  
      // Type assertion to handle additionalImages as an array
      const additionalImages = (product.additionalImages as unknown as { image: string }[]).map((img) => img.image);
  
      // Set images with main image followed by additional images
      setImages([mainImage, ...additionalImages]);
    }
  }, [product]);

  const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error fetching product data.</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        {/* Create a grid layout with two columns: one for the image and one for the product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
          
          {/* Slider for product images */}
          <div className="flex justify-center items-center">
            <button onClick={prevImage} className="px-4 py-2 text-lg font-bold">‹</button>

            {images.length > 0 && (
              <img
                src={images[currentImageIndex]}
                alt={product?.product_name}
                className="w-full max-w-md object-cover rounded-lg shadow-lg"
              />
            )}

            <button onClick={nextImage} className="px-4 py-2 text-lg font-bold">›</button>
          </div>

          {/* Right column for the product details */}
          <div className="bg-white p-6 rounded shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-black-2">{product.product_name}</h1>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  product.quantity > 0 ? 'bg-green-200 text-green-700' : 'bg-orange-200 text-red'
                }`}
              >
                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-500 mb-4">
              {product.product_description}
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-green-700">Price: {product.price}৳</span>
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
