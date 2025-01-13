"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddOrderMutation,
  useDeleteCartMutation,
  useGetCartsByUserIdQuery,
  useUpdateCartMutation,
} from "../../../redux/features/authApiSlice";
import { getUserFromCookie } from "@/hooks/getLoginUser";

export default function CartSection() {
  const user = getUserFromCookie();
  const { data: cart, isLoading: isProductLoading, isError: isProductError, refetch } = useGetCartsByUserIdQuery(user?.id, {
    skip: isNaN(user?.id),
  });

  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [addOrder] = useAddOrderMutation();
  const [quantities, setQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (cart?.items) {
      const initialQuantities = cart.items.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
    try {
      const formData = {
        item_id: itemId,
        quantity: newQuantity,
      };
      await updateCart({ id: user?.id, formData }).unwrap();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteCart({ userId: user?.id, itemId }).unwrap();
      toast.success(`Item removed successfully from the cart!`);
      await refetch();
    } catch (error) {
      console.error(`Failed to remove item ${itemId}:`, error);
    }
  };

  const handleCheckout = () => {
    if (!cart?.items || cart.items.length === 0) {
      toast.error("Your cart is empty. Add items to proceed.");
      return;
    }
    setIsModalOpen(true);
  };

  const confirmCheckout = async () => {
    const items = cart.items.map((item) => ({
      product: item.product.id,
      quantity: item.quantity,
    }));

    try {
      await addOrder({ items }).unwrap();
      toast.success("Order placed successfully!");
      setIsModalOpen(false);
      console.log("Order created:", items);
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="px-12 py-6 bg-white">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      <p className="text-xs text-gray-500 mb-6">
        There are {cart?.items?.length || 0} products in your cart
      </p>
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
              {cart?.items.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 flex items-center gap-3">
                    <Image
                      src={product.product?.product_image}
                      alt={product.product?.product_name}
                      className="w-12 h-12 object-cover rounded"
                      width={170}
                      height={200}
                    />
                    <span className="text-sm">{product.product.product_name}</span>
                  </td>
                  <td className="p-3 text-sm">{product.product.price}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="1"
                      value={quantities[product.id] || product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(product.id, parseInt(e.target.value, 10))
                      }
                      className="w-14 border rounded p-1 text-center text-sm"
                    />
                  </td>
                  <td className="p-3 text-sm">{product.subtotal}</td>
                  <td className="p-3 text-red-500 cursor-pointer">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      🗑️
                    </button>
                  </td>
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
            <span>${cart?.total_price || "0.00"}</span>
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
            <span>{cart?.total_price}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white w-full py-2 rounded text-sm hover:bg-green-600 transition"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Checkout</h2>
            <p className="text-sm mb-6">Are you sure you want to place the order?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded text-sm hover:bg-gray-400 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                onClick={confirmCheckout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
