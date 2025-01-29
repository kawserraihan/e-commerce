import React from "react";
import Image from "next/image";

interface PaymentOptionsProps {
  selectedPaymentMethod: string;
  handlePaymentMethodChange: (method: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ selectedPaymentMethod, handlePaymentMethodChange }) => {
  return (
    <div className="mb-4 mr-11 ml-11">
      <h4 className="font-medium text-sm mb-5 mt-8">Payment Options</h4>
      <div className="flex gap-4 text-sm mb-8">
        {/* COD Button */}
        <button
          onClick={() => handlePaymentMethodChange("cash")}
          className={`p-1 rounded-lg border transition ${
            selectedPaymentMethod === "cash"
              ? "bg-green-100 border-green-500"
              : "bg-gray-100 border-gray-300"
          } hover:bg-green-50`}
        >
          <Image
            src="https://demoapi.anticbyte.com/media/checkout/cod.svg"
            alt="Cash on Delivery"
            width={40}
            height={20}
            className="w-40 h-20"
          />
        </button>

        {/* bKash Button */}
        <button
          onClick={() => handlePaymentMethodChange("bkash")}
          className={`p-1 rounded-lg border transition ${
            selectedPaymentMethod === "bkash"
              ? "bg-green-100 border-green-500"
              : "bg-gray-100 border-gray-300"
          } hover:bg-green-50`}
        >
          <Image
            src="https://demoapi.anticbyte.com/media/checkout/bkash.svg"
            alt="bKash"
            width={40}
            height={20}
            className="w-40 h-20"
          />
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
