/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useAddProductToCartMutation, useGetCategoriesQuery, useGetProductsQuery } from "../../../../redux/features/authApiSlice";
import Link from "next/link";
import { getUserFromCookie } from "@/hooks/getLoginUser";
import { toast } from "react-toastify";

export default function PopularProductsSection() {
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 });

  const [activeCategory, setActiveCategory] = useState("All");

  const { data } = useGetProductsQuery({
    page: 1,
    page_size: 20
  });

  const products = data?.results

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products?.filter(
        (product) =>
          product.category_name.toLowerCase() === activeCategory.toLowerCase()
      );

  const [addProductToCart, { isLoading, isError, isSuccess }] = useAddProductToCartMutation();
  const [addedProducts, setAddedProducts] = useState([]);

  const setSessionStorageWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  };

  // Function to get session storage with expiration
  const getSessionStorageWithExpiry = (key) => {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }

    return item.value;
  };

  // const handleAddToCart = async (id: undefined) => {
  //   try {
  //     const response = await addProductToCart({
  //       userId: 49,
  //       productId: id,
  //       quantity: 2,
  //     }).unwrap();

  //     console.log('Product added to cart:', response);
  //     // alert('Product successfully added to cart!');
  //   } catch (error) {
  //     console.error('Error adding product to cart:', error);
  //     // alert('Failed to add product to cart. Please try again.');
  //   }
  // };

  const handleAddToCart = async (id) => {
    try {
      const user = getUserFromCookie();

      if (user && user.id) {
        const existingCart = getSessionStorageWithExpiry("cart") || [];
        const productExists = existingCart.some(
          (product) => product.productId === id
        );

        if (productExists) {
          toast.info("Product is already added to the cart.");
          return;
        }
        const response = await addProductToCart({
          userId: user.id,
          productId: id,
          quantity: 1,
        }).unwrap();

        console.log("Product added to cart:", response);
      } else {
        const existingCart = getSessionStorageWithExpiry("cart") || [];
        const productExists = existingCart.some(
          (product) => product.productId === id
        );

        if (productExists) {
          toast.info("Product is already added to the cart.");
          return;
        }

        const newProduct = { productId: id, quantity: 2 };
        existingCart.push(newProduct);

        setSessionStorageWithExpiry("cart", existingCart, 3600 * 1000);
        console.log("Product added to session storage:", newProduct);
      }

      setAddedProducts((prev) => [...new Set([...prev, id])]);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };


  return (
    <div className="px-6 py-4  ml-2 mr-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black ml-5">Products</h2>
        <div className="flex gap-4 text-sm mr-3">
          <div className="flex gap-4 text-sm mr-3">
            <button
              onClick={() => setActiveCategory("All")}
              className={`${activeCategory === "All"
                ? "text-green-500 border-b-2 border-green-500"
                : "text-gray-500"
                } font-medium px-2 pb-1 hover:text-green-500 transition`}>
              All
            </button>
            {categories?.results?.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.category_name)}
                className={`${activeCategory === category.category_name
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-500"
                  } font-medium px-2 pb-1 hover:text-green-500 transition`}>
                {category.category_name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-5 gap-3 ml-3 mr-3">
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            className="block border border-gray rounded-lg p-4 shadow-md hover:shadow-lg transition relative group bg-white no-underline">
            {/* Image Container */}
            <div className="w-full h-[200px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray shadow mb-4">
              <Link href={`/product_details/${product?.id}`}>
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  className="max-w-[170px] h-[200px] object-contain"
                />
              </Link>
            </div>
            {/* href={`/product_details/${product?.id}`} */}
            {/* Rest of the product card content remains the same */}
            <p style={{ fontSize: "12px" }} className="text-gray-500 mb-1 truncate">
              {product.category_name}
            </p>
            <h3 style={{ fontSize: "15px" }} className="text-base font-medium mb-1 text-gray-800 line-clamp-2">
              {product.product_name}
            </h3>
            <p className="text-xs text-gray-400 mb-2 truncate">
              {product.product_description}
            </p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold text-sm">{product.price}</span>
                {/* <span className="text-gray-400 line-through text-xs">{product.oldPrice}</span> */}
              </div>
            </div>
            <button
              style={{ fontSize: "12px" }}
              className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-2 rounded-full hover:bg-green-600 transition flex items-center gap-2"
              // onClick={(e) => {
              //   e.preventDefault();
              // }}
              onClick={() => {
                if (!addedProducts.includes(product.id)) {
                  handleAddToCart(product.id);
                } else {
                  alert("Product is already in the cart.");
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8M7 13h10l4-8H5.4m-2.4 0l1.6 8m-1.6-8h16.4m-1.6 8L17 21m-10-8L5 21m10 0h4"
                />
              </svg>
              {/* Add */}
              {addedProducts.includes(product.id) ? "Added" : "Add"}
            </button>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {activeCategory === "All" && (
        <div className="mt-6 text-center">
          <a
            href="/product_list"
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition cursor-pointer inline-block text-center"
          >
            View All
          </a>
        </div>
      )}
    </div>
  );
}
