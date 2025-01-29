"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";

// Define interfaces for Product and CartItem
interface Product {
  id: number;
  product_name: string;
  product_image: string;
  price: string;
}

interface CartItem {
  id: number;
  product_id?: number;
  product?: Product;
  product_name?: string;
  product_image?: string;
  price?: number | string;
  quantity: number;
  subtotal: number;
}

export default function CartSection() {
  // State variables to manage cart items, user ID, and login modal visibility
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // useEffect to load cart data on component mount
  useEffect(() => {
    const userCookie = Cookies.get("user");
    const token = Cookies.get("accessToken");

    if (userCookie && token) {
      const user = JSON.parse(userCookie);
      setUserId(user?.id || null);

      if (user?.id) {
        // Fetch cart data for authenticated users
        fetchCartFromAPI(user.id, token);
      }
    } else {
      // Load cart data from sessionStorage for unauthenticated users
      const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
      setCartItems(storedCart);
    }
  }, []);

  // Function to fetch cart data for authenticated users
  const fetchCartFromAPI = async (id: number, token: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/carts/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Show login modal if unauthorized
        setIsLoginModalOpen(true);
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch cart data");

      const data = await response.json();

      // Map API response to cart items structure
      const mappedCartItems = data.items.map((item: any) => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
        subtotal: item.subtotal,
      }));
      setCartItems(mappedCartItems);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to fetch cart data.");
    }
  };

  // Function to remove item from cart
  const handleRemoveItem = async (productId: number) => {
    const token = Cookies.get("accessToken");

    if (userId && token) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/carts/${userId}/remove_item/${productId}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          setIsLoginModalOpen(true);
          return;
        }

        if (!response.ok) throw new Error("Failed to remove item");

        toast.success("Item removed successfully!");
        fetchCartFromAPI(userId, token);
      } catch (error) {
        console.error("Error removing item:", error);
        toast.error("Failed to remove item.");
      }
    } else {
      // Update cart in sessionStorage for unauthenticated users
      const updatedCart = cartItems.filter((item) => item.product_id !== productId);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      toast.success("Item removed successfully!");
    }
  };

  // Function to handle quantity changes
  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    const token = Cookies.get("accessToken");

    if (newQuantity < 1) return;

    if (userId && token) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/carts/${userId}/update-item/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ item_id: itemId, quantity: newQuantity }),
          }
        );

        if (response.status === 401) {
          setIsLoginModalOpen(true);
          return;
        }

        if (!response.ok) throw new Error("Failed to update quantity");

        toast.success("Quantity updated successfully!");
        fetchCartFromAPI(userId, token);
      } catch (error) {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity.");
      }
    } else {
      // Update cart in sessionStorage for unauthenticated users
      const updatedCart = cartItems.map((item) =>
        item.product_id === itemId
          ? { ...item, quantity: newQuantity, subtotal: item.price! * newQuantity }
          : item
      );
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      toast.success("Quantity updated successfully!");
    }
  };

  // Function to handle successful login or signup
  const handleLoginOrSignupSuccess = async (accessToken: string, userId: number) => {
    setUserId(userId);

    // Sync cart data from sessionStorage to API
    const sessionCart: CartItem[] = JSON.parse(sessionStorage.getItem("cart") || "[]");

    if (sessionCart.length > 0) {
      try {
        for (const item of sessionCart) {
          await fetch(`http://localhost:8000/api/carts/${userId}/items/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              product_id: item.product_id,
              quantity: item.quantity,
            }),
          });
        }

        sessionStorage.removeItem("cart");
        fetchCartFromAPI(userId, accessToken);
        toast.success("Cart synced successfully!");
      } catch (error) {
        console.error("Error syncing cart:", error);
        toast.error("Failed to sync cart.");
      }
    }

    setIsLoginModalOpen(false);
    window.location.href = "/cart/checkout";
  };

  return (
    <div className="px-12 py-6 bg-white pb-20">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">No items in your cart.</p>
      ) : (
        <div className="grid grid-cols-3 gap-8">
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
                {cartItems.map((item) => {
                  const product = item.product || {
                    product_name: item.product_name,
                    product_image: item.product_image,
                    price: item.price,
                  };

                  return (
                    <tr key={item.id} className="border-b">
                      <td className="p-3 flex items-center gap-3">
                        <Image
                          src={product.product_image}
                          alt={product.product_name}
                          className="w-12 h-12 object-cover rounded"
                          width={50}
                          height={50}
                        />
                        <span className="text-sm">{product.product_name}</span>
                      </td>
                      <td className="p-3 text-sm">
                        ${Number(product.price).toFixed(2)}
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, parseInt(e.target.value, 10))
                          }
                          className="w-14 border rounded p-1 text-center text-sm"
                        />
                      </td>
                      <td className="p-3 text-sm">
                        ${Number(item.subtotal).toFixed(2)}
                      </td>
                      <td className="p-3 text-red-500 cursor-pointer">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-5 rounded-lg shadow border border-gray">
            <h3 className="text-sm font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>
                $
                {cartItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)}
              </span>
            </div>
            <button
              className="bg-green-500 text-white w-full py-2 rounded text-sm hover:bg-green-600 transition"
              onClick={() => {
                if (!userId) {
                  setIsLoginModalOpen(true);
                } else {
                  window.location.href = "/cart/checkout";
                }
              }}
            >
              Proceed To Delivery
            </button>
          </div>
        </div>
      )}

      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4 text-center">Login or Sign Up</h2>
            <LoginForm
              onSuccess={(accessToken, user) =>
                handleLoginOrSignupSuccess(accessToken, user.id)
              }
            />
            <p className="mt-4 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-primary hover:text-secondary"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
