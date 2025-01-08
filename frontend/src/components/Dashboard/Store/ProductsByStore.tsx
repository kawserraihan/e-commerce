/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  tag?: string;
}

interface Category {
  name: string;
  count: number;
}

const ProductList: React.FC = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const productsPerPage: number = 15;

  const products: Product[] = [
    {
      id: 1,
      name: "Tiffany Crunch Choco Biscuit",
      price: 27.95,
      originalPrice: 32.99,
      image: "https://ecstasybd.com/all-images/product/Product-Image-1732346028.jpg",
      tag: "New"
    },
    {
      id: 2,
      name: "Pringles Original Chips",
      price: 19.99,
      originalPrice: 24.99,
      image: "https://www.msmart.shop/assets/admin/img/products/9008759899.8.jpg",
      tag: "Sale"
    },
    {
      id: 3,
      name: "Kitkat Chocolate Bar",
      price: 15.95,
      originalPrice: 18.99,
      image: "https://www.msmart.shop/assets/admin/img/products/1876939449.0030000130222_1.jpg",
      tag: "Popular"
    },
    {
      id: 4,
      name: "Doritos Nacho Cheese",
      price: 22.95,
      originalPrice: 27.99,
      image: "https://www.msmart.shop/assets/admin/img/products/3395141983.3a.jpg",
      tag: "Hot"
    },
    {
      id: 5,
      name: "Tiffany Crunch Biscuit",
      price: 12.99,
      originalPrice: 16.99,
      image: "https://ecstasybd.com/all-images/product/Product-Image-1732346028.jpg"
    },
    {
      id: 6,
      name: "Original Potato Chips",
      price: 24.95,
      originalPrice: 29.99,
      image: "https://www.msmart.shop/assets/admin/img/products/9008759899.8.jpg",
      tag: "New"
    },
    {
      id: 7,
      name: "Kitkat Classic",
      price: 9.99,
      originalPrice: 12.99,
      image: "https://www.msmart.shop/assets/admin/img/products/1876939449.0030000130222_1.jpg"
    },
    {
      id: 8,
      name: "Nacho Cheese Doritos",
      price: 29.95,
      originalPrice: 34.99,
      image: "https://www.msmart.shop/assets/admin/img/products/3395141983.3a.jpg"
    },
    {
      id: 9,
      name: "Choco Biscuit Pack",
      price: 18.95,
      originalPrice: 22.99,
      image: "https://ecstasybd.com/all-images/product/Product-Image-1732346028.jpg",
      tag: "Organic"
    },
    {
      id: 10,
      name: "Classic Potato Chips",
      price: 16.95,
      originalPrice: 20.99,
      image: "https://www.msmart.shop/assets/admin/img/products/9008759899.8.jpg"
    },
    {
      id: 11,
      name: "Chocolate Wafer",
      price: 11.99,
      originalPrice: 14.99,
      image: "https://www.msmart.shop/assets/admin/img/products/1876939449.0030000130222_1.jpg"
    },
    {
      id: 12,
      name: "Cheese Flavored Chips",
      price: 13.95,
      originalPrice: 17.99,
      image: "https://www.msmart.shop/assets/admin/img/products/3395141983.3a.jpg"
    },
    {
      id: 13,
      name: "Premium Choco Biscuit",
      price: 21.95,
      originalPrice: 26.99,
      image: "https://ecstasybd.com/all-images/product/Product-Image-1732346028.jpg",
      tag: "Limited"
    },
    {
      id: 14,
      name: "Pringles Sour Cream",
      price: 8.99,
      originalPrice: 11.99,
      image: "https://www.msmart.shop/assets/admin/img/products/9008759899.8.jpg"
    },
    {
      id: 15,
      name: "Kitkat Dark Chocolate",
      price: 23.95,
      originalPrice: 28.99,
      image: "https://www.msmart.shop/assets/admin/img/products/1876939449.0030000130222_1.jpg"
    }
  ];

  const categories: Category[] = [
    { name: "All Items", count: 20 },
    { name: "Featured", count: 10 },
    { name: "Beverages", count: 8 },
    { name: "Fresh Food", count: 12 },
    { name: "Organic", count: 15 },
  ];

  // Pagination logic
  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts: Product[] = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages: number = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white">
      {/* Snack Section */}
      <div className="bg-[#F3F9F3] py-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-medium mb-4 px-4">Products of Store_Name</h1>
          <div className="flex gap-3 flex-wrap px-4">
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Clearance</span>
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Seasonal</span>
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">All Products</span>
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Family</span>
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Snacks</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8">
        <div className="grid grid-cols-12 gap-8 px-4">
          {/* Sidebar */}
          <div className="col-span-3">
            {/* Category Section */}
            <div className="mb-6">
              <div className="bg-white rounded-lg border border-gray shadow-md p-5">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Category</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-all duration-300 
                        ${selectedCategory === category.name
                          ? 'bg-green-50 text-green-600'
                          : 'hover:bg-gray-300 hover:shadow-sm text-gray-600'}`}
                    >
                      <span className="text-sm">{category.name}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {/* Products Grid */}
            <div className="grid grid-cols-5 gap-4">
              {data?.map((product: { id: React.Key | null | undefined; product_image: string | undefined; name: string | undefined; product_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; originalPrice: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow"
                  style={{ height: '100%' }} // Ensures that all cards have the same height
                >
                  <img
                    src={product.product_image}
                    alt={product.name}
                    width={170} // Replace with the desired width
                    height={200} // Replace with the desired height
                    style={{
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "0.375rem",
                      width: "100%",  // Makes the image take full width of the container
                      height: "150px", // Fixed height
                      objectFit: "cover", // Ensures the image covers the area without distorting ratio
                      marginBottom: "1rem"
                    }}
                  />
                  <h3 className="font-medium text-sm text-gray-800 mb-2">{product.product_name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-green-600 font-bold text-sm">${product.price}</span>
                      <span className="text-gray-400 line-through text-xs ml-2">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-full text-xs hover:bg-green-600 transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded ${currentPage === index + 1
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;