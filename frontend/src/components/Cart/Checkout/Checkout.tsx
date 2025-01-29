"use client";

import React, { useState, useEffect } from "react";
import ContactInfoForm from "./ContactInfoForm";
import ShippingInfoForm from "./ShippingInfoForm";
import PaymentOptions from "./PaymentOptions";
import CartOverview from "./CartOverview";
import OrderSummary from "./OrderSummary";
import { useGetCartsByUserIdQuery, useAddOrderMutation } from "../../../../redux/features/authApiSlice";
import { getUserFromCookie } from "@/hooks/getLoginUser";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

const Checkout: React.FC = () => {
    const router = useRouter();
    const [form, setForm] = useState<{
        fullName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        altPhone: string;
        note: string;
        paymentMethod: string;
        coupon: string;
        orderId: number | null; // Allow both number and null
      }>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        altPhone: "",
        note: "",
        paymentMethod: "cash",
        coupon: "",
        orderId: null,
      });

      const [isClient, setIsClient] = useState(false); // Ensure client-side rendering

      useEffect(() => {
        setIsClient(true); // Ensure this component renders only on the client
      }, []);
    
      const [user, setUser] = useState<{ id: number | null } | null>(null);
    
      useEffect(() => {
        // Get the user only on the client
        const userFromCookie = getUserFromCookie();
        if (userFromCookie) {
          setUser(userFromCookie);
        }
      }, []);
    
  const userId = user?.id && !isNaN(user?.id) ? user.id : null;

  const { data: cartData, isLoading: isCartLoading, error: cartError } = useGetCartsByUserIdQuery(userId, { skip: !userId });
  const [addOrder, { isLoading: isOrderLoading }] = useAddOrderMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePaymentMethodChange = (method: string) => {
    setForm({ ...form, paymentMethod: method });
  };

  const handleBkashPayment = async (orderId: string) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:8000/api/transactions/bkash/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderId }),
      });

      const data = await response.json();
      if (data?.bkash_url) {
        window.open(data.bkash_url, "_blank");
      } else {
        toast.error("Failed to retrieve Bkash payment URL.");
      }
    } catch (error) {
      console.error("Failed to initiate Bkash payment:", error);
      toast.error("Failed to initiate Bkash payment. Please try again.");
    }
  };

  const handleOrderConfirm = async () => {

    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city) {
        toast.warning("Please fill in all the required fields in the checkout info.");
        return;
      }

    if (!cartData?.items?.length) {
      toast.error("Cart is empty!");
      return;
    }

    try {
      const orderResponse = await addOrder({
        items: cartData.items.map((item:any) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
        payment_method: form.paymentMethod,
      }).unwrap();

      setForm({ ...form, orderId: orderResponse.id });

      const checkoutResponse = await fetch("http://localhost:8000/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          alt_phone: form.altPhone,
          address: form.address,
          city: form.city,
          note: form.note,
          coupon: form.coupon,
          order_id: orderResponse.id,
        }),
      });

      if (checkoutResponse.ok) {
        toast.success("Order placed successfully!");

        if (form.paymentMethod === "bkash") {
          handleBkashPayment(orderResponse.id.toString());
        } else if (form.paymentMethod === "cash") {
          // Redirect to cash invoice page
          router.push(`/cart/cash-invoice/${orderResponse.id}`);
        }
      } else {
        toast.error("Failed to save checkout info.");
      }
    } catch (error) {
      console.error("Error in order confirmation:", error);
      toast.error("Something went wrong while placing the order.");
    }
  };

  if (isCartLoading) return <p>Loading cart...</p>;
  if (cartError) return <p>Error loading cart!</p>;

  const totalPrice = cartData?.total_price || 0;
  const shippingCost = form.city === "Inside Dhaka" ? 60 : form.city === "Outside Dhaka" ? 120 : 0;

  return (
    <div className="checkout-container">
      <div className="flex flex-col bg-white rounded-lg md:flex-row bg-gray-100 min-h-screen p-6 gap-6">
        {/* Left Section */}
        <div className="w-full md:w-2/3">
          <ContactInfoForm form={form} handleInputChange={handleInputChange} />
          <ShippingInfoForm form={form} handleInputChange={handleInputChange} />
          <OrderSummary totalPrice={totalPrice} shippingCost={shippingCost} />
          <PaymentOptions
            selectedPaymentMethod={form.paymentMethod}
            handlePaymentMethodChange={handlePaymentMethodChange}
          />
          <button
            className=" bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600 transition pr-90 pl-100 mr-10 ml-11"
            onClick={handleOrderConfirm}
            disabled={isOrderLoading}
          >
            {isOrderLoading ? "Processing Order..." : "Confirm Order"}
          </button>
        </div>
 
        {/* Right Section */}
        <div className="w-full md:w-1/3">
          <CartOverview cartItems={cartData?.items || []} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
