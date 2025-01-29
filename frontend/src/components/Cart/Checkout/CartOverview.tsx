import React from "react";
import Image from "next/image";

interface CartItem {
  id: number;
  product: {
    product_name: string;
    product_image: string;
    price: string;
  };
  quantity: number;
}

interface CartOverviewProps {
  cartItems: CartItem[];
  totalPrice: number;
}

const CartOverview: React.FC<CartOverviewProps> = ({ cartItems, totalPrice }) => {
  return (
    <div className="bg-[#F8F8F8] p-6 rounded-lg shadow-md ml-8 mr-15 mt-8">
      <h3 className="text-lg font-bold text-black-2 mb-6 border-b border-gray-300 pb-3 text-center">
        Cart Overview
      </h3>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 mb-4 p-4 bg-white shadow-sm rounded-lg"
        >
          <Image
            src={item.product.product_image}
            alt={item.product.product_name}
            width={60}
            height={60}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-black-2">{item.product.product_name}</p>
            <p className="text-sm text-gray-600">Unit Price: ৳{parseFloat(item.product.price).toFixed(2)}</p>
            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-sm font-medium text-green-600">
              Subtotal: ৳{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      <hr className="my-6 border-gray-300" />
      <div className="pt-4">
        <p className="text-lg font-semibold text-gray-900 text-right">
          Total: <span className="text-green-600 font-bold">৳{totalPrice.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartOverview;