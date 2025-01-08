"use client";
import React from "react";
import Image from 'next/image';

export default function CartSection() {
  return (
    <div className="px-12 py-6 bg-white">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      <p className="text-xs text-gray-500 mb-6">There are 3 products in your cart</p>

      <div className="grid grid-cols-3 gap-8">
        {/* Cart Table */}
        <div className="col-span-2 border border-gray shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-sm font-semibold">Product</th>
                <th className="p-3 text-sm font-semibold">Unit Price</th>
                <th className="p-3 text-sm font-semibold">Quantity</th>
                <th className="p-3 text-sm font-semibold">Subtotal</th>
                <th className="p-3 text-sm font-semibold">Remove</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Field Roast Chao Cheese Creamy Original",
                  price: "$2.51",
                  image: "https://ecstasybd.com/all-images/product/Product-Image-1732346028.jpg",
                  quantity: 1,
                  subtotal: "$2.51",
                },
                {
                  name: "Blue Diamond Almonds Lightly Salted",
                  price: "$3.2",
                  image: "https://ecstasybd.com/all-images/product/Product-Image-1704865295.jpg",
                  quantity: 1,
                  subtotal: "$3.2",
                },
                {
                  name: "Fresh Organic Mustard Leaves Bell Pepper",
                  price: "$2.43",
                  image: "https://ecstasybd.com/all-images/product/Product-Image-1715947856.jpg",
                  quantity: 1,
                  subtotal: "$2.43",
                },
              ].map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 flex items-center gap-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                      width={170} // Replace with the desired width
                      height={200} // Replace with the desired height
                    />
                    <span className="text-sm">{product.name}</span>
                  </td>
                  <td className="p-3 text-sm">{product.price}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      className="w-14 border rounded p-1 text-center text-sm"
                    />
                  </td>
                  <td className="p-3 text-sm">{product.subtotal}</td>
                  <td className="p-3 text-red-500 cursor-pointer">🗑️</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="bg-white p-5 rounded-lg shadow border border-gray">
          <h3 className="text-sm font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal</span>
            <span>$12.31</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Estimate for</span>
            <span>United Kingdom</span>
          </div>
          <div className="flex justify-between font-bold text-sm mb-4">
            <span>Total</span>
            <span>$12.31</span>
          </div>
          <button className="bg-green-500 text-white w-full py-2 rounded text-sm hover:bg-green-600 transition">
            Proceed To Checkout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg border border-gray shadow">
          <h3 className="font-bold mb-2 text-sm">Calculate Shipping</h3>
          <p className="text-xs text-gray-500 mb-3">Flat rate: 5%</p>
          <form>
            <select className="w-full p-2 border rounded mb-3 text-sm">
              <option>United Kingdom</option>
            </select>
            <input
              type="text"
              placeholder="State / Country"
              className="w-full p-2 border rounded mb-3 text-sm"
            />
            <input
              type="text"
              placeholder="PostCode / ZIP"
              className="w-full p-2 border rounded text-sm"
            />
          </form>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg border border-gray shadow">
          <h3 className="font-bold mb-2 text-sm">Apply Coupon</h3>
          <p className="text-xs text-gray-500 mb-3">Using A Promo Code?</p>
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Your Coupon"
              className="flex-grow p-2 border rounded text-sm"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition">
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
