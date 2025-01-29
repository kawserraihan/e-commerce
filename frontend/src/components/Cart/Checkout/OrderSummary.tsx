import React from "react";

interface OrderSummaryProps {
  totalPrice: number;
  shippingCost: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalPrice, shippingCost }) => {
  return (
    <div className="bg-[#F8F8F8] rounded-lg p-6 mb-6 shadow-md mt-10 mr-11 ml-11">
      <h3 className="text-xl font-semibold text-black mb-6 text-center">
        Total Breakdown: <span className="text-green-600 font-bold">৳ {(totalPrice + shippingCost).toFixed(2)}</span>
      </h3>
      <table className="w-full text-sm border-collapse rounded-lg bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-center text-black-2 font-medium py-3 border-b border-gray-300">Purpose</th>
            <th className="text-center text-black-2 font-medium py-3 border-b border-gray-300">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-100">
            <td className="text-black text-center py-3 border-b border-gray-300">Total</td>
            <td className="text-green-500 text-center py-3 border-b border-gray-300">৳ {totalPrice.toFixed(2)}</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="text-black text-center py-3 border-b border-gray-300">Shipping</td>
            <td className="text-green-500 text-center py-3 border-b border-gray-300">৳ {shippingCost.toFixed(2)}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="text-black font-bold text-center py-3">Total Including Shipping</td>
            <td className="text-green-500 font-bold text-center py-3">৳ {(totalPrice + shippingCost).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm text-center text-gray-700 mt-6">You will get the delivery <span className="text-green-600 font-medium">within 2-3 Days</span> after confirmation.</p>
    </div>
  );
};

export default OrderSummary;
