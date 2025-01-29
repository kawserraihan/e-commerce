"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PaymentStatus = () => {
  const router = useRouter();
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paymentID = query.get("paymentID");
    const statusParam = query.get("status");

    if (statusParam === "success" && paymentID) {
      fetchOrderDetails(paymentID);
    } else if (statusParam !== "success") {
      setStatus("failed");
      setLoading(false);
    }
  }, []);

  const fetchOrderDetails = async (paymentID: string) => {
    try {
      setLoading(true);
      const token = Cookies.get("accessToken");
      const backendUrl = process.env.NEXT_PUBLIC_HOST;

      const response = await axios.get(`${backendUrl}/api/order-details/`, {
        params: { paymentID },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setInvoice(response.data);
        setStatus("success");
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      setStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  const printInvoice = () => {
    const content = document.getElementById("invoice-content");
    const printWindow = window.open("", "_blank");
    if (printWindow && content) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              .invoice-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
              .invoice-header img { max-height: 30px; display: block; margin: auto; }
              .address-section { display: flex; justify-content: space-between; margin-bottom: 20px; }
              .address-section div { width: 48%; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background-color: #f9f9f9; }
              .total { text-align: right; font-weight: bold; }
              .product-image { height: 20px; width: 20px; object-fit: cover; }
            </style>
          </head>
          <body>
            ${content.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-30 mb-5">
      {loading ? (
        <p className="text-lg text-gray-600">Processing your payment...</p>
      ) : status === "success" && invoice ? (
        <div id="invoice-content">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8 invoice-header">
            <div>
              <h1 className="text-4xl font-bold">INVOICE</h1>
              <p className="text-gray-500">Date: {invoice.order_date}</p>
            </div>
            <div>
              <img 
                src="http://localhost:3000/_next/image?url=https%3A%2F%2Fdemoapi.anticbyte.com%2Fmedia%2Fbanners%2Fmsmart.png&w=256&q=75" 
                alt="Logo" 
                className="max-h-8"
              />
              <p className="text-gray-500 mt-4">Order Tracking No. {invoice.order_id}</p>
            </div>
          </div>

          {/* Address Section */}
          <div className="address-section">
            <div>
              <h2 className="text-lg font-semibold">Billed to:</h2>
              <p>{invoice.delivery_info[0]?.full_name || "N/A"}</p>
              <p>{invoice.delivery_info[0]?.address || "N/A"}</p>
              <p>{invoice.delivery_info[0]?.email || "N/A"}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">From:</h2>
              <p>Name: Msmart</p>
              <p>+880 1877 716660</p>
              <p>Email: info@msmart.shop</p>
              <p>বাড়ি # ৩১, রোড # ০৯, সেক্টর # ১৫, উত্তরা, ঢাকা-১২৩০</p>
            </div>
          </div>

          {/* Item Table */}
          <table className="w-full border-collapse border border-gray-300 mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Price</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{item.product_name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <img 
                      src={`${process.env.NEXT_PUBLIC_HOST}${item.product_image}`} 
                      alt={item.product_name} 
                      className="h-16 w-16 product-image mx-auto" 
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">৳ {item.price}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">৳ {item.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Section */}
          <div className="flex justify-end mb-8">
            <div>
              <p className="text-lg font-semibold">
                Total: <span className="text-black">৳ {invoice.total_amount}</span>
              </p>
            </div>
          </div>

          {/* Payment and Note Section */}
          <div className="mb-8">
            <p>
              <strong>Payment method:</strong> {invoice.payment_method}
            </p>
            <p>
              {/* <strong>Payment status:</strong> {invoice.payment_status} */}
              <strong>Payment status:</strong> Paid
            </p>
            <p>
              <strong>Note:</strong> Thank you for your business!
            </p>
          </div>

          {/* Print Button */}
          <div className="text-center">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={printInvoice}
            >
              Print Invoice
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">Payment Failed</h1>
          <p className="text-gray-600">We could not verify your payment. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
