import React from "react";

interface ProductPricingAndStockProps {
  productPrice: string;
  stockQuantity: string;
  onChange: (key: string, value: any) => void;
}

const ProductPricingAndStock: React.FC<ProductPricingAndStockProps> = ({
  productPrice,
  stockQuantity,
  onChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black-2 mb-4 border-b border-gray-300 pb-2">
        Pricing and Stock
      </h3>
      <input
        type="number"
        value={productPrice}
        onChange={(e) => onChange("productPrice", e.target.value)}
        placeholder="Product Price"
        className="border border-[#B1C7E5] rounded-md p-2 w-full mb-4"
        required
      />
      <input
        type="number"
        value={stockQuantity}
        onChange={(e) => onChange("stockQuantity", e.target.value)}
        placeholder="Stock Quantity"
        className="border border-[#B1C7E5] rounded-md p-2 w-full"
        required
      />
    </div>
  );
};

export default ProductPricingAndStock;
