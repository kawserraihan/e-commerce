'use client';
import type { Invoice } from "@/types/invoice";
import React, { useState } from "react";



const invoiceData: Invoice[] = [
    {
      no: 1,
      invoiceID: 1,
      invoiceAmount: 500,
      customer: 'Iftekhar Ifty',
      customerEmail: 'iftekhar@gmail.com',
      customerAddress: 'Sector: 6, Road: 1, House: 13, Uttara, Dhaka',
      customerContact: '01608637246',
      lastPaymentDate: '12/08/2024',
      product: [{name: 'Blue Shirt', quantity: 1, price: 250}, {name: 'Red Shirt', quantity: 1, price: 250} ],
      paymentHistory: [{date: '12/08/2024', amount: 400, method:'Bkash'}],
      productTypes: 'Men Wear',
      discount: 0,
      deliveryCharge: 0,
      dueAmount: 100,
      paymentMethod: 'Bkash',
    },
  ];

// The component to view invoice details
// The component to view invoice details
const InvoiceView = () => {
    // State for new payment
    const [paymentAmount, setPaymentAmount] = useState<number>();
    const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card');
  
    return (
        <div className="max-w-full p-7 pt-1">
    {invoiceData.map((invoice, index) => (
      <div key={index} className="max-w-full bg-white shadow-lg rounded-lg p-8 relative">
        {/* Print Button */}
        <div className="absolute top-4 right-4">
        <button
          onClick={() => window.print()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Invoice Print
        </button>
        </div>

        <h1 className="text-2xl font-bold mb-4">Invoice No # {invoice.invoiceID}</h1>

        {/* Flex Container */}
        <div className="flex justify-between mb-8 gap-6">
          {/* Invoice No and Customer Information on the Left */}
          <div className="w-1/2">
            <p>Total Bill: <span className="font-bold">{invoice.invoiceAmount}</span></p>
            <p className="text-red">Invoice Due: <span className="font-bold">{invoice.dueAmount}</span></p>
            <p className="text-lg font-semibold">Customer Information</p>
            <p>Name: {invoice.customer}</p>
            <p>Email: {invoice.customerEmail}</p>
            <p>Address: {invoice.customerAddress}</p>
            <p>Last Payment Date: {invoice.lastPaymentDate}</p>
          </div>

          {/* New Payment Section */}
          <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-2">Add New Payment</h2>
            <div className="flex items-center space-x-4 mb-2">
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                placeholder="Payment Amount"
                className="border p-2 rounded w-1/2"
              />
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border p-2 rounded w-1/2"
              >
                <option value="Credit Card">--Select Payment Method--</option>
                <option value="PayPal">Bkash</option>
                <option value="Bank Transfer">Nagad</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Submit Payment
            </button>
          </div>
        </div>

        {/* List of Products */}
        <div className="border dark:border-strokedark border-[#eee] py-5 px-6 rounded-lg p-4 mb-4 shadow-lg bg-white">
  <h2 className="text-xl text-center font-semibold mb-2">Products Purchased</h2>
  <table className="w-full table-auto rounded-lg bg-white">
  <thead>
    <tr className="bg-gray-2 text-left dark:bg-meta-4">
      <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Sl</th>
      <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Product Name</th>
      <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Quantity</th>
      <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Price</th>
    </tr>
  </thead>
  <tbody>
    {invoice.product.map((product, index) => (
      <tr key={index} className="border dark:border-strokedark border-t border-b">
        <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{index+1}</td>
        <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{product.name}</td>
        <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{product.quantity}</td>
        <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{product.price.toFixed(2)} ৳</td>
      </tr>
   
    ))}
    {/* Total Row */}
    <tr>
      <td colSpan={2} className="border-none text-right py-5 p-3 px-6 dark:text-white">
        
      </td>
      <td className="text-right border-none py-1 p-3 px-6 dark:text-white font-bold">
        Total Price :
      </td>
      <td className="text-center border-none py-1 p-3 px-6 dark:text-white">
        {/* Calculate total price */}
        {invoice.product.reduce((acc, product) => acc + product.price, 0).toFixed(2)} ৳
      </td>
    </tr>
    <tr>
      <td colSpan={2} className="border-none text-right py-5 p-3 px-6 dark:text-white font-bold">
        
      </td>
      <td className="text-right border-none py-1 p-3 px-6 dark:text-white font-bold">
        Delivery Charge :
      </td>
      <td className="text-center border-none py-1 p-3 px-6 dark:text-white">
        {invoice.deliveryCharge}.00 ৳
      </td>
    </tr>
    <tr>
      <td colSpan={2} className="border-none text-right py-5 p-3 px-6 dark:text-white">
        
      </td>
      <td className="text-right border-none py-1 p-3 px-6 dark:text-white font-bold">
        Discount :
      </td>
      <td className="text-center border-none py-1 p-3 px-6 dark:text-white">
        {/* Calculate total price */}
        {invoice.discount}.00 ৳
      </td>
    </tr>
    <tr>
      <td colSpan={2} className="border-none text-right py-5 p-3 px-6 dark:text-white">
        
      </td>
      <td className="text-right border-none py-1 p-3 px-6 dark:text-white font-bold">
        Total (Including Del.) :
      </td>
      <td className="text-center border-none py-1 p-3 px-6 dark:text-white">
        {/* Calculate total price */}
        {invoice.invoiceAmount + invoice.deliveryCharge}.00 ৳
      </td>
    </tr>
  </tbody>
  
</table>


        </div>

        {/* Payment History */}
        {/* <div className="max-w-full p-7 pt-6"> */}
        <br></br>
        <div className="border dark:border-strokedark border-[#eee] py-5 px-6 rounded-lg p-4 mb-4 shadow-lg bg-white">
          <h2 className="text-xl text-center font-semibold mb-2">Payment History</h2>
          <table className="w-full table-auto border rounded-lg">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Date</th>
                <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Payment Method</th>
                <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.paymentHistory.map((payment, index) => (
                <tr key={index} className="border-t">
                  <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{payment.date}</td>
                  <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{payment.method}</td>
                  <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{payment.amount.toFixed(2)} ৳</td>
                </tr>
                
              ))}
              
            </tbody>
          </table>
        </div>
        </div>
     
    ))}
  </div>
    );
  };
  
  export default InvoiceView;