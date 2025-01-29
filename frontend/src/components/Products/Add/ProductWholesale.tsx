import React from "react";

interface WholesaleRange {
  min_quantity: string;
  max_quantity: string;
  price_per_unit: string;
}

interface ProductWholesaleProps {
  wholesaleRanges: WholesaleRange[];
  onChange: (ranges: WholesaleRange[]) => void;
}

const ProductWholesale: React.FC<ProductWholesaleProps> = ({
  wholesaleRanges,
  onChange,
}) => {
  const handleRangeChange = (
    index: number,
    field: keyof WholesaleRange,
    value: string
  ) => {
    const updatedRanges = wholesaleRanges.map((range, idx) =>
      idx === index ? { ...range, [field]: value } : range
    );
    onChange(updatedRanges);
  };

  const addMoreWholesaleRange = () => {
    onChange([
      ...wholesaleRanges,
      { min_quantity: "", max_quantity: "", price_per_unit: "" },
    ]);
  };

  const removeWholesaleRange = (index: number) => {
    const updatedRanges = wholesaleRanges.filter((_, idx) => idx !== index);
    onChange(updatedRanges);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black-2 mb-4 border-b border-gray-300 pb-2">
        Wholesale Pricing
      </h3>
      {wholesaleRanges.map((range, index) => (
        <div key={index} className="mb-4 space-y-2">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Min Quantity"
              value={range.min_quantity}
              onChange={(e) =>
                handleRangeChange(index, "min_quantity", e.target.value)
              }
              className="border border-[#B1C7E5] rounded-md p-2 w-full"
            />
            <input
              type="number"
              placeholder="Max Quantity"
              value={range.max_quantity}
              onChange={(e) =>
                handleRangeChange(index, "max_quantity", e.target.value)
              }
              className="border border-[#B1C7E5] rounded-md p-2 w-full"
            />
            <input
              type="number"
              placeholder="Price Per Unit"
              value={range.price_per_unit}
              onChange={(e) =>
                handleRangeChange(index, "price_per_unit", e.target.value)
              }
              className="border border-[#B1C7E5] rounded-md p-2 w-full"
            />
          </div>
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeWholesaleRange(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addMoreWholesaleRange}
        className="bg-teal-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Add More +
      </button>
    </div>
  );
};

export default ProductWholesale;
