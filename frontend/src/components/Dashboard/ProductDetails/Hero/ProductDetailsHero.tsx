"use client";
import React, { useState } from "react";
import Image from 'next/image';
import { useGetProductByIdQuery } from "../../../../../redux/features/authApiSlice";

export default function SingleProductView({ id }) {
  console.log(id, "iddididi");

  const productImages = [
    "https://ecstasybd.com/all-images/product/Product-Image-1732346028.jpg",
    "https://www.msmart.shop/assets/admin/img/products/9008759899.8.jpg",
    "https://www.msmart.shop/assets/admin/img/products/1876939449.0030000130222_1.jpg",
    "https://www.msmart.shop/assets/admin/img/products/3395141983.3a.jpg"
  ];

  // State to track current main image
  const [mainImage, setMainImage] = useState(productImages[0]);
  const { data: product, isLoading: isProductLoading, isError: isProductError } = useGetProductByIdQuery(id, {
    skip: isNaN(id),
  });
  console.log(product, "product get by id ");

  const additionalImages = product?.additionalImages instanceof FileList
    ? Array.from(product.additionalImages).map((file) => URL.createObjectURL(file))
    : product?.additionalImages;

  const imageSources = additionalImages || productImages;


  return (
    <div className="px-12 py-6 bg-white ml-1">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 ml-5">
        Home / Categories / <span className="text-green-500 font-bold">Products</span>
      </nav>
      {/* Product Details Section */}
      <div className="grid grid-cols-12 gap-8 mb-12 ml-7">
        {/* Product Images */}
        <div className="col-span-4">
          {/* Fixed size container for main image */}
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray shadow mb-4">
            <Image
              src={product?.product_image}
              alt="Product"
              className="max-w-full max-h-full object-contain p-4"
              width={170}
              height={200}
            />
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4">
            {imageSources.map((src, index) => (
              <button
                key={index}
                onClick={() => setMainImage(src)}
                className={`w-25 h-30 rounded-lg border border-gray shadow overflow-hidden ${mainImage === src ? 'border-green-500 border-2' : 'border-gray-200'
                  }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={170}
                  height={200}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-span-5">
          <h1 className="text-2xl font-bold mb-4">Seeds of Change Organic Quinoa, Brown</h1>
          <div className="text-green-500 font-bold text-3xl mb-2">$38</div>
          <div className="text-sm text-gray-500 mb-6">Was $52</div>
          <p className="text-sm text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam rem
            officia.
          </p>

          {/* Product Options */}
          <div className="flex items-center mb-2">
            <label className="text-sm text-gray-500 mr-4">Size:</label>
            <select className="p-3 border rounded">
              <option>Select</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
            </select>
          </div>
          <div className="flex items-center mb-6">
            <label className="text-sm text-gray-500 mr-4">Color:</label>
            <select className="p-3 border rounded">
              <option>Red</option>
              <option>Green</option>
              <option>Blue</option>
            </select>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-16 p-2 border rounded text-center"
            />
            <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
              Add to Cart
            </button>
          </div>

          {/* Product Meta */}
          <div className="mt-6 text-sm text-gray-600">
            <p>Type: Organic</p>
            <p>SKU: XYZ-12345</p>
            <p>Tags: Organic, Brown, Quinoa</p>
            <p>Stock: 8 items in stock</p>
          </div>
        </div>

        {/* Category Section */}
        <div className="col-span-2 bg-white p-4 rounded-lg border border-gray">
          <h2 className="text-lg font-bold mb-4">Category</h2>
          <ul className="text-sm text-gray-600 space-y-4">
            <li className="flex justify-between items-center bg-white p-3 rounded shadow">
              <span className="flex items-center gap-2">

                Milk & Dairies
              </span>
              <span className="text-green-500 font-bold">5</span>
            </li>
            <li className="flex justify-between items-center bg-white p-3 rounded shadow">
              <span className="flex items-center gap-2">

                Clothing
              </span>
              <span className="text-green-500 font-bold">6</span>
            </li>
            <li className="flex justify-between items-center bg-white p-3 rounded shadow">
              <span className="flex items-center gap-2">

                Pet Foods
              </span>
              <span className="text-green-500 font-bold">7</span>
            </li>
            <li className="flex justify-between items-center bg-white p-3 rounded shadow">
              <span className="flex items-center gap-2">

                Baking Material
              </span>
              <span className="text-green-500 font-bold">12</span>
            </li>
            <li className="flex justify-between items-center bg-white p-3 rounded shadow">
              <span className="flex items-center gap-2">

                Fresh Fruit
              </span>
              <span className="text-green-500 font-bold">16</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-12">
        <ul className="flex border-b text-sm mb-4">
          {["Description", "Additional Info", "Vendor", "Reviews (0)"].map(
            (tab, index) => (
              <li
                key={index}
                className="mr-6 pb-2 border-b-2 border-transparent hover:border-green-500 cursor-pointer"
              >
                {tab}
              </li>
            )
          )}
        </ul>
        <div className="text-sm text-gray-600">
          Uninhabited carnally hired alighted on whimpered did gorilla loading.
        </div>
      </div>
    </div>
  );
}