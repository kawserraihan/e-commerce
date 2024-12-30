"use client";
import React, { useState } from "react";
import Image from 'next/image';


export default function PopularProductsSection() {
  const categories = ["All", "Milks & Dairies", "Coffees & Teas", "Pet Foods", "Meats", "Vegetables", "Fruits"];
  const [activeCategory, setActiveCategory] = useState("All");

  const products = [
    {
      id: 1,
      category: "Milks & Dairies",
      title: "Seeds of Change Organic Quinoa",
      description: "By NestFood",
      price: "$28.85",
      oldPrice: "$32.8",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1732346028.jpg",
    },
    {
      id: 2,
      category: "Coffees & Teas",
      title: "All Natural Italian-Style Chicken Meatballs",
      description: "By Stouffer",
      price: "$52.85",
      oldPrice: "$55.8",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1704865295.jpg",
    },
    {
      id: 3,
      category: "Pet Foods",
      title: "Angie's Boomchickapop Kettle Corn",
      description: "By StarKist",
      price: "$48.85",
      oldPrice: "$52.8",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1733988001.jpg",
    },
    {
      id: 4,
      category: "Meats",
      title: "Foster Farms Takeout Classic Wings",
      description: "By NestFood",
      price: "$17.85",
      oldPrice: "$19.8",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1731834099.jpg",
    },
    {
      id: 5,
      category: "Vegetables",
      title: "Blue Diamond Almonds",
      description: "By NestFood",
      price: "$23.85",
      oldPrice: "$25.8",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1731841484.jpg",
    },
    {
      id: 6,
      category: "Fruits",
      title: "Chobani Vanilla Greek Yogurt",
      description: "By NestFood",
      price: "$54.85",
      oldPrice: "$55.8",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1715947856.jpg",
    },
    {
      id: 7,
      category: "Meats",
      title: "Canada Dry Ginger Ale",
      description: "By NestFood",
      price: "$32.85",
      oldPrice: "$33.8",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1725000373.jpg",
    },
    {
      id: 8,
      category: "Coffees & Teas",
      title: "Encore Stuffed Alaskan Salmon",
      description: "By NestFood",
      price: "$35.85",
      oldPrice: "$37.8",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1652012223.jpg",
    },
    {
      id: 9,
      category: "Vegetables",
      title: "Gorton's Beer Battered Fillets",
      description: "By Old El Paso",
      price: "$23.85",
      oldPrice: "$25.8",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1713934674.jpg",
    },
  ];

  const filteredProducts = activeCategory === "All" ? products : products.filter(product => product.category === activeCategory);

  return (
    <div className="px-6 py-4  ml-2 mr-2">
      {/* Header and Categories */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black ml-5">Products</h2>
        <div className="flex gap-4 text-sm mr-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`${
                activeCategory === category
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-500"
              } font-medium px-2 pb-1 hover:text-green-500 transition`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>


{/* Products Grid */}
      <div className="grid grid-cols-5 gap-3 ml-3 mr-3">
        {filteredProducts.map((product) => (
          <a 
            href={`/product_details/`}
            key={product.id}
            className="block border border-gray rounded-lg p-4 shadow-md hover:shadow-lg transition relative group bg-white no-underline"
          >
            {/* Image Container */}
            <div className="w-full h-[200px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray shadow mb-4">
              <Image 
                src={product.image} 
                alt={product.title} 
                className="max-w-[170px] h-[200px] object-contain"
              />
            </div>
            {/* Rest of the product card content remains the same */}
            <p style={{ fontSize: "12px"}} className="text-gray-500 mb-1 truncate">
              {product.category}
            </p>
            <h3 style={{ fontSize: "15px"}} className="text-base font-medium mb-1 text-gray-800 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-xs text-gray-400 mb-2 truncate">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold text-sm">{product.price}</span>
                <span className="text-gray-400 line-through text-xs">{product.oldPrice}</span>
              </div>
            </div>
            <button 
              style={{ fontSize: "12px"}}
              className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-2 rounded-full hover:bg-green-600 transition flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
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
              Add
            </button>
          </a>
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
