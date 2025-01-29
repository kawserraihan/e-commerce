import React from "react";

interface ProductImageUploadProps {
  productImage: File | null;
  additionalImages: File[];
  onImageChange: (key: string, value: any) => void;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  productImage,
  additionalImages,
  onImageChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black-2 mb-4 border-b border-gray-300 pb-2">
        Product Images
      </h3>
      <input
        type="file"
        onChange={(e) =>
          onImageChange("productImage", e.target.files?.[0] || null)
        }
        className="border border-[#B1C7E5] rounded-md p-2 w-full mb-4"
        required
      />
      <input
        type="file"
        multiple
        onChange={(e) =>
          onImageChange(
            "additionalImages",
            Array.from(e.target.files || [])
          )
        }
        className="border border-[#B1C7E5] rounded-md p-2 w-full"
      />
      {productImage && (
        <p className="text-sm mt-2 text-green-600">
          Main Image: {productImage.name}
        </p>
      )}
      {additionalImages.length > 0 && (
        <p className="text-sm mt-2 text-blue-600">
          {additionalImages.length} Additional Images Selected
        </p>
      )}
    </div>
  );
};

export default ProductImageUpload;
