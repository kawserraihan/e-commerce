import React from 'react';
import { useGetColorsQuery, useGetSizesQuery } from '../../../redux/features/authApiSlice';

const ColorSize = ({ fields, setFields, setSelectedSizeId, setSelectedColorId }) => {
    const { data: sizes, isLoading: isSizeLoading } = useGetSizesQuery({ page: 1, page_size: 100 });
    const { data: colors, isLoading: isColorsLoading } = useGetColorsQuery({ page: 1, page_size: 100 });

    const addFields = () => {
        setFields([...fields, { colorId: '', sizeId: '', price: '', discount: '', stockQuantity: '' }]);
    };

    const handleFieldChange = (index: any, field: string, value: string) => {
        const updatedFields = fields.map((item: any, idx: any) =>
            idx === index ? { ...item, [field]: value } : item
        );
        setFields(updatedFields);
        const selectedColors = updatedFields.map((field: { colorId: any; }) => field.colorId).filter(Boolean);
        const selectedSizes = updatedFields.map((field: { sizeId: any; }) => field.sizeId).filter(Boolean);
        setSelectedColorId(selectedColors);
        setSelectedSizeId(selectedSizes);
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
            {fields.map((field: { colorId: string | number | readonly string[] | undefined; sizeId: string | number | readonly string[] | undefined; price: string | number | readonly string[] | undefined; }, index: React.Key | null | undefined) => (
                <div key={index} className="mb-4">
                    <p>{index + 1}.</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor={`color-${index}`} className="text-sm font-medium block mb-2">
                                Color
                            </label>
                            <select
                                id={`color-${index}`}
                                value={field.colorId}
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
                                value={field.sizeId}
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
                    <div className=" mb-4">
                        <div>
                            <label htmlFor={`price-${index}`} className="text-sm font-medium block mb-2">
                                Price
                            </label>
                            <input
                                id={`price-${index}`}
                                type="number"
                                value={field.price}
                                onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
                                placeholder="Enter price"
                                className="border border-[#B1C7E5] rounded-md p-2 w-full"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ColorSize;

