import React from "react";

interface ProductCategorySelectionProps {
  selectedCategoryId: number | null;
  selectedSubcategoryId: number | null;
  selectedChildcategoryId: number | null;
  categories: { id: number; name: string }[];
  subcategories: { id: number; name: string }[];
  childcategories: { id: number; name: string }[];
  onChange: (key: string, value: any) => void;
}

const ProductCategorySelection: React.FC<ProductCategorySelectionProps> = ({
  selectedCategoryId,
  selectedSubcategoryId,
  selectedChildcategoryId,
  categories,
  subcategories,
  childcategories,
  onChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black-2 mb-4 border-b border-gray-300 pb-2">
        Category Selection
      </h3>
      <select
        value={selectedCategoryId || ""}
        onChange={(e) => onChange("selectedCategoryId", Number(e.target.value))}
        className="border border-[#B1C7E5] rounded-md p-2 w-full mb-4"
        required
      >
        <option value="" disabled>
          --Select Category--
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        value={selectedSubcategoryId || ""}
        onChange={(e) =>
          onChange("selectedSubcategoryId", Number(e.target.value))
        }
        className="border border-[#B1C7E5] rounded-md p-2 w-full mb-4"
        required
      >
        <option value="" disabled>
          --Select Subcategory--
        </option>
        {subcategories.map((subcategory) => (
          <option key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </option>
        ))}
      </select>
      <select
        value={selectedChildcategoryId || ""}
        onChange={(e) =>
          onChange("selectedChildcategoryId", Number(e.target.value))
        }
        className="border border-[#B1C7E5] rounded-md p-2 w-full"
        required
      >
        <option value="" disabled>
          --Select Childcategory--
        </option>
        {childcategories.map((childcategory) => (
          <option key={childcategory.id} value={childcategory.id}>
            {childcategory.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductCategorySelection;
