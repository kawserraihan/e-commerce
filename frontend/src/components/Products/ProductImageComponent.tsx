/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'

const ProductImageComponent = ({ additionalPreviews, previewImage, handleImageChange, handleAdditionalImagesChange, handleRemoveImage }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Add Product Photo</h2>
            <div className="w-full mb-8 mx-auto p-6  rounded-md bg-white shadow-md">
                <div
                    className="border-2 border-dashed border-[#B1C7E5] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById("productImage").click()}
                >
                    {previewImage ? (
                        <Image
                            width={48}
                            height={48}
                            src={previewImage}
                            alt="Preview"
                            className="object-cover h-48 w-48 rounded-md"
                        />
                    ) : (
                        <>
                            <div className="text-4xl text-orange-500 mb-2">⬆️</div>
                            <p className="text-gray-600">
                                Drop your images here, or
                                <span className="text-orange-500 underline">click to browse</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are
                                allowed.
                            </p>
                        </>
                    )}
                </div>
                <input
                    id="productImage"
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => document.getElementById("additionalImages")?.click()}
                    className="mt-4 w-full bg-teal-500 text-white text-md px-4 py-2 font-bold rounded-md hover:bg-teal-600"
                >
                    Add Additional Images
                </button>
                <input
                    id="additionalImages"
                    type="file"
                    multiple
                    onChange={handleAdditionalImagesChange}
                    className="hidden"
                />

                <div className="mt-4 flex gap-4">
                    {additionalPreviews.map((imageSrc: string | undefined, index: number) => (
                        <div
                            key={index}
                            className="relative flex items-center border border-[#B1C7E5] rounded-md p-1 w-24 h-24">
                            <img
                                src={imageSrc}
                                alt={`Preview ${index + 1}`}
                                className="object-cover w-full h-full rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full transform -translate-x-1 translate-y-1"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductImageComponent