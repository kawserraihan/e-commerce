import React from "react";

interface VariantField {
  colorId: string | number;
  sizeId: string | number;
  price: string;
}

interface ProductVariantsProps {
  fields: VariantField[];
  onChange: (fields: VariantField[]) => void;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({ fields, onChange }) => {
  const handleFieldChange = (index: number, key: string, value: any) => {
    const updatedFields = [...fields];
    (updatedFields[index] as any)[key] = value;
    onChange(updatedFields);
  };

  const addVariantField = () => {
    onChange([...fields, { colorId: "", sizeId: "", price: "" }]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black-2 mb-4 border-b border-gray-300 pb-2">
        Product Variants
      </h3>
      {fields.map((field, index) => (
        <div key={index} className="mb-4 flex gap-4 items-center">
          <input
            type="text"
            value={field.colorId}
            onChange={(e) => handleFieldChange(index, "colorId", e.target.value)}
            placeholder="Color ID"
            className="border border-[#B1C7E5] rounded-md p-2 w-1/3"
          />
          <input
            type="text"
            value={field.sizeId}
            onChange={(e) => handleFieldChange(index, "sizeId", e.target.value)}
            placeholder="Size ID"
            className="border border-[#B1C7E5] rounded-md p-2 w-1/3"
          />
          <input
            type="number"
            value={field.price}
            onChange={(e) => handleFieldChange(index, "price", e.target.value)}
            placeholder="Price"
            className="border border-[#B1C7E5] rounded-md p-2 w-1/3"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addVariantField}
        className="bg-[#67c5c3] text-white font-bold py-2 px-4 rounded-md hover:bg-[#56b3b0]"
      >
        Add Variant
      </button>
    </div>
  );
};

export default ProductVariants;
