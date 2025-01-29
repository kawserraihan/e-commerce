import React, { useState, useRef } from 'react';
import { useGetColorsQuery, useGetSizesQuery } from '../../../redux/features/authApiSlice';
import Image from 'next/image';

interface ColorSizeField {
  colorId: string | number | null;
  sizeId: string | number | null;
  price: string | number | null;
  discount?: string | number | null;
  stockQuantity?: string | number | null;
  variantImage?: File | null;
}

interface ColorSizeProps {
    fields: ColorSizeField[];
    setFields: React.Dispatch<React.SetStateAction<ColorSizeField[]>>;
    setSelectedSizeId: (sizes: (string | number | null)[]) => void;
    setSelectedColorId: (colors: (string | number | null)[]) => void;
  }

const ColorSize: React.FC<ColorSizeProps> = ({
  fields,
  setFields,
  setSelectedSizeId,

  setSelectedColorId,

}) => {
  const { data: sizes, isLoading: isSizeLoading } = useGetSizesQuery({ page: 1, page_size: 100 });
  const { data: colors, isLoading: isColorsLoading } = useGetColorsQuery({ page: 1, page_size: 100 });

  const [uploadedImages, setUploadedImages] = useState<Record<number, string>>({});
  const fileInputRefs = useRef<HTMLInputElement[]>([]);

  const addFields = () => {
    setFields([...fields, { colorId: '', sizeId: '', price: '', discount: '', stockQuantity: '', variantImage: null }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, idx) => idx !== index));
    setUploadedImages((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const handleFieldChange = (
    index: number,
    field: keyof ColorSizeField,
    value: string | number
  ) => {
    const updatedFields = fields.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setFields(updatedFields);

    const selectedColors = updatedFields.map((field) => field.colorId).filter(Boolean);
    const selectedSizes = updatedFields.map((field) => field.sizeId).filter(Boolean);
    setSelectedColorId(selectedColors);
    setSelectedSizeId(selectedSizes);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const updatedFields = fields.map((item, idx) =>
        idx === index ? { ...item, variantImage: file } : item
      );
      setFields(updatedFields);

      const previewURL = URL.createObjectURL(file);
      setUploadedImages((prev) => ({ ...prev, [index]: previewURL }));
    }
  };

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="w-full flex justify-end mb-2">
        <button
          onClick={addFields}
          className="bg-teal-500 text-white text-md px-4 py-2 font-bold rounded-md hover:bg-teal-600"
        >
          Add more +
        </button>
      </div>
      {fields.map((field, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium">Variant {index + 1}</p>
            <button
              onClick={() => removeField(index)}
              className="bg-red-500 text-white text-sm px-2 py-1 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor={`color-${index}`} className="text-sm font-medium block mb-2">
                Color
              </label>
              <select
                id={`color-${index}`}
                value={field.colorId ?? ''}
                onChange={(e) => handleFieldChange(index, 'colorId', e.target.value)}
                className="border border-[#B1C7E5] rounded-md p-2 w-full"
              >
                <option value="" disabled>
                  {isColorsLoading ? 'Loading Colors...' : 'Select Color'}
                </option>
                {colors &&
                  colors.results.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.color_name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor={`size-${index}`} className="text-sm font-medium block mb-2">
                Size
              </label>
              <select
                id={`size-${index}`}
                value={field.sizeId ?? ''}
                onChange={(e) => handleFieldChange(index, 'sizeId', e.target.value)}
                className="border border-[#B1C7E5] rounded-md p-2 w-full"
              >
                <option value="" disabled>
                  {isSizeLoading ? 'Loading Sizes...' : 'Select Size'}
                </option>
                {sizes &&
                  sizes.results.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.size_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor={`price-${index}`} className="text-sm font-medium block mb-2">
              Price
            </label>
            <input
              id={`price-${index}`}
              type="number"
              value={field.price ?? ''}
              onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
              placeholder="Enter price"
              className="border border-[#B1C7E5] rounded-md p-2 w-full"
            />
          </div>
          <div
            className="border-2 border-dashed border-[#B1C7E5] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => fileInputRefs.current[index]?.click()}
          >
            {uploadedImages[index] ? (
              <Image
                width={200}
                height={200}
                src={uploadedImages[index]}
                alt="Preview"
                className="object-cover h-48 w-48 rounded-md"
              />
            ) : (
              <>
                <div className="text-4xl text-orange-500 mb-2">⬆️</div>
                <p className="text-gray-600">
                  Drop your images here, or{' '}
                  <span className="text-orange-500 underline">click to browse</span>
                </p>
                <p className="text-sm text-gray-500">
                  1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.
                </p>
              </>
            )}
            <input
              ref={(el) => (fileInputRefs.current[index] = el!)}
              id={`variantImage-${index}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorSize;
