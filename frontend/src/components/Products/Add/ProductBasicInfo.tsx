import React from "react";

interface ProductBasicInfoProps {
  productName: string;
  productCode: string;
  productDescription: string;
  productType: string;
  onChange: (key: string, value: any) => void;
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  productName,
  productCode,
  productDescription,
  productType,
  onChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black-2 mb-4 border-b border-gray-300 pb-2">
        Basic Information
      </h3>
      <input
        type="text"
        value={productName}
        onChange={(e) => onChange("productName", e.target.value)}
        placeholder="Product Name"
        className="border border-[#B1C7E5] rounded-md p-2 w-full mb-4"
        required
      />
      <input
        type="text"
        value={productCode}
        onChange={(e) => onChange("productCode", e.target.value)}
        placeholder="Product Code"
        className="border border-[#B1C7E5] rounded-md p-2 w-full mb-4"
        required
      />
      <textarea
        value={productDescription}
        onChange={(e) => onChange("productDescription", e.target.value)}
        placeholder="Product Description"
        className="border border-[#B1C7E5] rounded-md p-2 w-full mb-4"
        required
      />
      <select
        value={productType}
        onChange={(e) => onChange("productType", e.target.value)}
        className="border border-[#B1C7E5] rounded-md p-2 w-full"
        required
      >
        <option value="" disabled>
          --Select Product Type--
        </option>
        <option value="wholesale">Wholesale</option>
        <option value="regular">Regular</option>
      </select>
    </div>
  );
};

export default ProductBasicInfo;
