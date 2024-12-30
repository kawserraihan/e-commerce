"use client";
import React from "react";
import Image from 'next/image';

export default function DealsOfTheDaySection() {
  const deals = [
    {
      id: 1,
      title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
      category: "By NestFood",
      rating: "4.0",
      price: "$32.85",
      oldPrice: "$33.8",
      discount: "15%",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1732346028.jpg",
    },
    {
      id: 2,
      title: "Perdue Simply Smart Organics Gluten Free",
      category: "By Old El Paso",
      rating: "4.0",
      price: "$24.85",
      oldPrice: "$25.8",
      discount: "10%",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1704865295.jpg",
    },
    {
      id: 3,
      title: "Signature Wood-Fired Mushroom and Caramelized",
      category: "By Progresso",
      rating: "4.0",
      price: "$12.85",
      oldPrice: "$13.8",
      discount: "20%",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1715947856.jpg",
    },
    {
      id: 4,
      title: "Simply Lemonade with Raspberry Juice",
      category: "By Yoplait",
      rating: "3.0",
      price: "$15.85",
      oldPrice: "$16.8",
      discount: "5%",
      image: "https://ecstasybd.com/all-images/product/Product-Image-1713934674.jpg",
    },
  ];

  return (
    <div className="px-6 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Deals Of The Day</h2>
        <a href="#" className="text-green-500 font-medium hover:underline">
          All Deals &gt;
        </a>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-4 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            style={{ height: "400px" }}
          >
            {/* Discount Tag */}
            <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full z-10">
              Save {deal.discount}
            </div>

            {/* Image Container */}
            <div className="w-full h-60 flex items-center justify-center bg-gray-50">
              <Image
                src={deal.image}
                alt={deal.title}
                className="max-w-[200px] h-[200px] object-contain"
              />
            </div>

            {/* Details */}
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg">
              {/* Title */}
              <h3 className="text-base font-medium text-gray-800 mb-1 truncate">
                {deal.title}
              </h3>

              {/* Category */}
              <p className="text-sm text-gray-500 mb-2 truncate">
                {deal.category}
              </p>

              {/* Rating and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold text-sm">
                    {deal.price}
                  </span>
                  <span className="text-gray-400 line-through text-xs">
                    {deal.oldPrice}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="bg-green-500 text-white px-3 py-2 rounded-full hover:bg-green-600 transition flex items-center gap-2">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}