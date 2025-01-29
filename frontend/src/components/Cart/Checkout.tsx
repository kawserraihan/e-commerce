// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useGetCartsByUserIdQuery, useAddOrderMutation } from "../../../redux/features/authApiSlice";
// import { getUserFromCookie } from "@/hooks/getLoginUser";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Checkout = () => {
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     altPhone: "",
//     note: "",
//     paymentMethod: "cash",
//     coupon: "",
//     orderId: null, // To store the generated order ID
//   });

//   const user = getUserFromCookie();
//   const userId = user?.id && !isNaN(user?.id) ? user?.id : null;

//   const { data: cartData, isLoading: isCartLoading, error: cartError } = useGetCartsByUserIdQuery(userId, { skip: !userId });
//   const [addOrder, { isLoading: isOrderLoading }] = useAddOrderMutation();

//   // Handle form input changes
//   const handleInputChange = (e:any) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // Handle payment method change
//   const handlePaymentMethodChange = (method:any) => {
//     setForm({ ...form, paymentMethod: method });
//   };

//   // Handle Bkash payment
//   const handleBkashPayment = async (orderId:any) => {
//     try {
//       const token = Cookies.get("accessToken"); // Get the token from cookies
//       if (!token) {
//         toast.error("Session expired. Please log in again.");
//         return;
//       }

//       const response = await axios.post(
//         "http://localhost:8000/api/transactions/bkash/",
//         { order_id: orderId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data?.bkash_url) {
//         // Open Bkash URL in a new tab
//         window.open(response.data.bkash_url, "_blank");
//       } else {
//         alert("Failed to retrieve Bkash payment URL.");
//       }
//     } catch (error) {
//       console.error("Failed to initiate Bkash payment:", error);
//       alert("Failed to initiate Bkash payment. Please try again.");
//     }
//   };

//   // Handle order confirmation
//   const handleOrderConfirm = async () => {
//     if (!cartData?.items?.length) {
//       alert("Cart is empty!");
//       return;
//     }

//     try {
//       // Send cart data and payment method to the order API
//       const orderResponse = await addOrder({
//         items: cartData.items.map((item) => ({
//           product: item.product.id,
//           quantity: item.quantity,
//         })),
//         payment_method: form.paymentMethod, // Add payment method
//       }).unwrap();

//       // Update the form with the generated order ID
//       setForm({ ...form, orderId: orderResponse.id });

//       // Send the checkout info with the order ID
//       const checkoutResponse = await fetch("http://localhost:8000/api/checkout/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           full_name: form.fullName,
//           email: form.email,
//           phone: form.phone,
//           alt_phone: form.altPhone,
//           address: form.address,
//           city: form.city,
//           note: form.note,
//           coupon: form.coupon,
//           order_id: orderResponse.id,
//         }),
//       });

//       if (checkoutResponse.ok) {
//         alert("Order and checkout info saved successfully!");

//         // If payment method is "bkash", initiate Bkash payment
//         if (form.paymentMethod === "bkash") {
//           handleBkashPayment(orderResponse.id);
//         }
//       } else {
//         console.error("Failed to save checkout info.");
//       }
//     } catch (error) {
//       console.error("Error in order confirmation:", error);
//     }
//   };

//   if (isCartLoading) return <p>Loading cart...</p>;
//   if (cartError) return <p>Error loading cart!</p>;

//   return (
//     <div className="flex flex-col bg-white rounded-lg md:flex-row bg-gray-100 min-h-screen pr-25 pl-25 pt-4 gap-6 mt-27">
//       {/* Left Section */}
//       <div className="w-full md:w-2/3 p-6">
//         <h2 className="text-xl font-bold mb-4 text-black-2 text-center">Checkout Info</h2>

//         {/* Contact Info */}
//         <div className="mb-4">
//           <h3 className="font-medium text-sm mb-2 text-black-2">Contact Info</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={handleInputChange}
//               className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleInputChange}
//               className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={handleInputChange}
//               className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
//             />
//           </div>
//         </div>

//         {/* Shipping Info */}
//         <div className="mb-4">
//           <h3 className="font-medium text-sm mb-2 text-black-2">Shipping Info</h3>
//           <input
//             type="text"
//             name="address"
//             placeholder="Detailed Address"
//             value={form.address}
//             onChange={handleInputChange}
//             className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full mb-2"
//           />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="city"
//               placeholder="Select City"
//               value={form.city}
//               onChange={handleInputChange}
//               className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
//             />
//             <input
//               type="tel"
//               name="altPhone"
//               placeholder="Alt. Phone (01XXXXXXXXX)"
//               value={form.altPhone}
//               onChange={handleInputChange}
//               className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
//             />
//           </div>
//           <textarea
//             name="note"
//             placeholder="Special instructions for delivery"
//             value={form.note}
//             onChange={handleInputChange}
//             className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full mt-2"
//           />
//         </div>


//         {/* Breakdown */} 
//         <div className="bg-[#F8F8F8] rounded-lg p-6 mb-6 shadow-md mt-10">
//   <h3 className="text-xl font-semibold text-black mb-6 text-center">
//     Total Breakdown:{" "}
//     <span className="text-green-600 font-bold">
//       ৳ {(cartData?.total_price + 60).toFixed(2)}
//     </span>
//   </h3>
//   <table className="w-full text-sm border-collapse rounded-lg bg-white">
//     <thead>
//       <tr className="bg-gray-200">
//         <th className="text-center text-black-2 font-medium py-3 border-b border-gray-300">Purpose</th>
//         <th className="text-center text-black-2 font-medium py-3 border-b border-gray-300">Amount</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr className="even:bg-gray-100">
//         <td className="text-black text-center py-3 border-b border-gray-300">Total</td>
//         <td className="text-green-500 text-center py-3 border-b border-gray-300">
//           ৳ {cartData?.total_price?.toFixed(2)}
//         </td>
//       </tr>
//       <tr className="even:bg-gray-100">
//         <td className="text-black text-center py-3 border-b border-gray-300">Shipping</td>
//         <td className="text-green-500 text-center py-3 border-b border-gray-300">৳ 60</td>
//       </tr>
//       <tr className="bg-gray-100">
//         <td className="text-black font-bold text-center py-3">Total Including Shipping</td>
//         <td className="text-green-500 font-bold text-center py-3">
//           ৳ {(cartData?.total_price + 60).toFixed(2)}
//         </td>
//       </tr>
//     </tbody>
//   </table>
//   <p className="text-sm text-center text-gray-700 mt-6">
//     You will get the delivery{" "}
//     <span className="text-green-600 font-medium">within 2-3 Days</span>{" "}
//     after confirmation.
//   </p>
// </div>


//         {/* Payment Options */}
//         <div className="mb-4">
//           <h4 className="font-medium text-sm mb-2">Payment Options</h4>
//           <div className="flex gap-4 text-sm">
//             {/* COD Button */}
//             <button
//               onClick={() => handlePaymentMethodChange("cash")}
//               className={`p-1 rounded-lg border transition ${
//                 form.paymentMethod === "cash"
//                   ? "bg-green-100 border-green-500"
//                   : "bg-gray-100 border-gray-300"
//               } hover:bg-green-50`}
//             >
//               <Image
//                 src="https://demoapi.anticbyte.com/media/checkout/cod.svg"
//                 alt="Cash on Delivery"
//                 width={40}
//                 height={20}
//                 className="w-40 h-20"
//               />
//             </button>

//             {/* bKash Button */}
//             <button
//               onClick={() => handlePaymentMethodChange("bkash")}
//               className={`p-1 rounded-lg border transition ${
//                 form.paymentMethod === "bkash"
//                   ? "bg-green-100 border-green-500"
//                   : "bg-gray-100 border-gray-300"
//               } hover:bg-green-50`}
//             >
//               <Image
//                 src="https://demoapi.anticbyte.com/media/checkout/bkash.svg"
//                 alt="bKash"
//                 width={40}
//                 height={20}
//                 className="w-40 h-20"
//               />
//             </button>
//           </div>
//         </div>

//           {/* Coupon Section */}
//           <div className="mb-4 flex gap-2">
//           <input
//             type="text"
//             name="coupon"
//             placeholder="Enter Coupon Code Here"
//             value={form.coupon}
//             onChange={handleInputChange}
//             className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm flex-grow"
//           />
//           <button className="px-4 py-2 bg-blue-500 text-white rounded text-sm">
//             Add Coupon
//           </button>
//         </div>

//         {/* Terms & Conditions */}
//         <div className="mb-4 text-sm">
//           <input type="checkbox" id="terms" className="bg-gray-100" />
//           <label htmlFor="terms" className="ml-2 text-gray-600">
//             I agree to{" "}
//             <a href="/terms" className="text-blue-500 underline">
//               Terms & Conditions
//             </a>
//             ,{" "}
//             <a href="/refund-policy" className="text-blue-500 underline">
//               Refund Policy
//             </a>
//             , and{" "}
//             <a href="/privacy-policy" className="text-blue-500 underline">
//               Privacy Policy
//             </a>
//           </label>
//         </div>

//         {/* Confirm Order Button */}
//         <button
//           className="w-full bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600 transition"
//           onClick={handleOrderConfirm}
//           disabled={isOrderLoading}
//         >
//           {isOrderLoading ? "Processing Order..." : "Confirm Order"}
//         </button>
//       </div>

//       {/* Right Section - Cart Overview */}
//       <div className="w-full md:w-1/3 p-6">
//   <div className="bg-[#F8F8F8] p-6 rounded-lg shadow-md">
//     <h3 className="text-lg font-bold text-black-2 mb-6 border-b border-gray-300 pb-3 text-center">
//       Cart Overview
//     </h3>
//     {cartData?.items?.map((item) => (
//       <div
//         key={item.id}
//         className="flex items-center gap-4 mb-4 p-4 bg-white shadow-sm rounded-lg"
//       >
//         <Image
//           src={item.product.product_image}
//           alt={item.product.product_name}
//           width={60}
//           height={60}
//           className="w-16 h-16 rounded-lg object-cover"
//         />
//         <div className="flex-1">
//           <p className="text-sm font-semibold text-black-2">{item.product.product_name}</p>
//           <p className="text-sm text-gray-600">Unit Price: ৳{parseFloat(item.product.price).toFixed(2)}</p>
//           <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//           <p className="text-sm font-medium text-green-600">
//             Subtotal: ৳{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
//           </p>
//         </div>
//       </div>
//     ))}
//     {/* Divider below all cart items */}
//     <hr className="my-6 border-gray-300" />
//     <div className="pt-4">
//       <p className="text-lg font-semibold text-gray-900 text-right">
//         Total:{" "}
//         <span className="text-green-600 font-bold">
//           ৳{cartData?.total_price?.toFixed(2)}
//         </span>
//       </p>
//     </div>
//   </div>
// </div>




//     </div>
//   );
// };

// export default Checkout;


