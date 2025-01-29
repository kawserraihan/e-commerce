import React from "react";

interface ProductBrandModelSelectionProps {
  selectedBrandId: number | null;
  selectedModelId: number | null;
  brands: { id: number; name: string }[];
  models: { id: number; name: string }[];
  onChange: (key: string, value: any) => void;
}

const ProductBrandModelSelection: React.FC<ProductBrandModelSelectionProps> = ({
  selectedBrandId,
  selectedModelId,
  brands,
  models,
  onChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black-2 mb-4 border-b border-gray-300 pb-2">
        Brand and Model Selection
      </h3>
      <select
        value={selectedBrandId || ""}
        onChange={(e) => onChange("selectedBrandId", Number(e.target.value))}
        className="border border-[#B1C7E5] rounded-md p-2 w-full mb-4"
        required
      >
        <option value="" disabled>
          --Select Brand--
        </option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
      <select
        value={selectedModelId || ""}
        onChange={(e) => onChange("selectedModelId", Number(e.target.value))}
        className="border border-[#B1C7E5] rounded-md p-2 w-full"
        required
      >
        <option value="" disabled>
          --Select Model--
        </option>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductBrandModelSelection;
