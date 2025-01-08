"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../../../redux/features/authApiSlice";

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pageSize] = useState<number>(2);

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({ page: 1, page_size: 100 });

  const { data, isLoading } = useGetProductsQuery({
    page: currentPage,
    page_size: 100,
  });

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? data?.results?.filter((product) => product.category_name === selectedCategory)
    : data?.results; // If no category is selected, show all products

  // Calculate total pages based on filtered products
  const totalPages = Math.ceil((filteredProducts?.length || 0) / pageSize);

  // Handle pagination
  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get the products to display on the current page
  const displayedProducts = filteredProducts?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full bg-white">
      {/* Snack Section */}
      <div className="bg-[#F3F9F3] py-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-medium mb-4 px-4">Products</h1>
          <div className="flex gap-3 flex-wrap px-4">
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
              Clearance
            </span>
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
              Seasonal
            </span>
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
              All Products
            </span>
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
              Family
            </span>
            <span className="px-6 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
              Snacks
            </span>
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
                  {categories?.results?.map((category) => (
                    <div
                      key={category.category_name}
                      onClick={() => {
                        setSelectedCategory(category.category_name);
                        setCurrentPage(1); // Reset to the first page when changing the category
                      }}
                      className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-all duration-300 
                        ${selectedCategory === category.category_name
                          ? "bg-green-50 text-green-600"
                          : "hover:bg-gray-300 hover:shadow-sm text-gray-600"
                        }`}
                    >
                      <span className="text-sm">{category.category_name}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">
                        {/* {category.count} */}
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
            {displayedProducts?.length === 0 ? (
              <div className="text-center text-lg font-medium text-gray-600 mt-20">
                No products found for this category.
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-4">
                {displayedProducts?.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Image
                      src={product.product_image}
                      alt={product.product_name}
                      width={170}
                      height={200}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "0.375rem",
                        objectFit: "cover",
                        marginBottom: "1rem",
                        width: "100%",
                        height: "150px",
                      }}
                    />
                    <h3 className="font-medium text-sm text-gray-800 mb-2">
                      {product.product_name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-green-600 font-bold text-sm">
                          ${product.price}
                        </span>
                      </div>
                      <button className="bg-green-500 text-white px-3 py-1 rounded-full text-xs hover:bg-green-600 transition-colors">
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Pagination */}
            {displayedProducts?.length !== 0 && <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded ${currentPage === index + 1
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
            }

          </div>
        </div>
      </div>
    </div >
  );
};

export default ProductList;
