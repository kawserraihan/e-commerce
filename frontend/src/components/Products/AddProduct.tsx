'use client';

import { useState, useEffect } from 'react';
import {
  useAddProductMutation,
  useAddProductImageMutation,
  useGetCategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
  useGetChildcategoryByCategorySubcategoryQuery,
  useGetBrandsQuery,
  useGetModelsQuery,
  useGetColorsQuery,
  useGetSizesQuery,

} from '../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS
import Image from "next/image";

const AddProductPage = () => {
  const [productName, setProductName] = useState<string>('');


  const [productType, setProductType] = useState<string>('');
  const [rangePrice1, setRangePrice1] = useState('');
  const [rangePrice2, setRangePrice2] = useState('');
  const [rangePrice3, setRangePrice3] = useState('');




  const [productDescription, setProductDescription] = useState<string>('');
  const [productCode, setProductCode] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0); // Price
  const [isActive, setIsActive] = useState<boolean>(true); // By default, the product is active
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // State for the selected category ID
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null); // State for the selected subcategory ID
  const [selectedChildcategoryId, setSelectedChildcategoryId] = useState<number | null>(null); // State for the selected childcategory ID
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null); // State for the selected brand ID
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null); // State for the selected model ID




  const [productImage, setProductImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);



  // Additional states for multiple images
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  const [addProduct, { isLoading, isError }] = useAddProductMutation();
  const [addProductImage] = useAddProductImageMutation();

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 });
  const { data: subcategories, isLoading: isSubcategoriesLoading, error: subcategoriesError } = useGetSubcategoriesByCategoryQuery(selectedCategoryId ?? 0, { skip: !selectedCategoryId || selectedCategoryId === 0 });
  const { data: childcategories, isLoading: isChildcategoriesLoading, error: childcategoriesError } = useGetChildcategoryByCategorySubcategoryQuery({ categoryid: selectedCategoryId ?? 0, subcategoryid: selectedSubcategoryId ?? 0 }, { skip: !selectedCategoryId || !selectedSubcategoryId });
  const { data: brands, isLoading: isBrandsLoading, error: brandsError } = useGetBrandsQuery({ page: 1, page_size: 100 });
  const { data: models, isLoading: isModelsLoading, error: modelsError } = useGetModelsQuery({ page: 1, page_size: 100 });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId || !selectedSubcategoryId || !selectedChildcategoryId || !selectedBrandId || !selectedModelId) {
      toast.error('Please select all the dropdown fields');
      return;
    }

    const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files);
        setAdditionalImages(prevImages => [...prevImages, ...filesArray]); // Add new files to state
        setAdditionalPreviews(prev => [...prev, ...filesArray.map(file => URL.createObjectURL(file))]); // Preview URLs
      }
    };
    const handleRemoveImage = (indexToRemove: number) => {
      setAdditionalImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
      setAdditionalPreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
    };

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_type', productType);
    formData.append('product_description', productDescription);
    formData.append('product_code', productCode);
    formData.append('price', productPrice.toString());
    formData.append('is_active', isActive.toString());
    formData.append('category', selectedCategoryId.toString());
    formData.append('sub_category', selectedSubcategoryId.toString());
    formData.append('child_category', selectedChildcategoryId.toString());
    formData.append('brand', selectedBrandId.toString());
    formData.append('model', selectedModelId.toString());


    try {
      const productResponse = await addProduct(formData).unwrap();
      const productId = productResponse.id;

      for (let image of additionalImages) {
        const imageFormData = new FormData();
        imageFormData.append('product', productId.toString());
        imageFormData.append('image', image);
        await addProductImage(imageFormData).unwrap();
      }
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add Product. Please try again.');
      console.error('Error adding Product:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProductImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAdditionalImages(prevImages => [...prevImages, ...filesArray]); // Add new files to state
      setAdditionalPreviews(prev => [...prev, ...filesArray.map(file => URL.createObjectURL(file))]); // Preview URLs
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setAdditionalImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    setAdditionalPreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
  };





  return (
    // <div className="container mx-auto py-8">
    //   <div className="flex flex-col md:flex-row items-start gap-8">

    //     {/* Left side form container */}
    //     <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200">
    //       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    //         <label htmlFor="productCode" className="text-sm font-medium">Product Code</label>
    //         <input id="productCode" type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} placeholder="Enter product code" required className="border border-[#B1C7E5] rounded-md p-2" />

    //         {/* Product Name */}
    //         <label htmlFor="productName" className="text-sm font-medium">Product Name</label>
    //         <input id="productName" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" required className="border border-[#B1C7E5] rounded-md p-2" />

    //         {/* Product Type */}
    //         <label htmlFor="productType" className="text-sm font-medium">Product Type</label>
    //         <select id="productType" value={productType} onChange={(e) => setProductType(e.target.value)} required className="border border-[#B1C7E5] rounded-md p-2">
    //           <option value="" disabled>--Select a Product Type--</option>
    //           <option value="wholesale">Wholesale</option>
    //           <option value="regular">Regular</option>
    //           <option value="seller">Seller</option>
    //         </select>


    //         {/* Conditional Inputs for Wholesale */}
    //   {productType === 'wholesale' && (
    //     <div className="mt-4 space-y-3">
    //       {/* Range 1 */}
    //       <div>
    //         <label htmlFor="rangePrice1" className="text-sm font-medium">
    //           Price for Quantity 10 to 25
    //         </label>
    //         <input
    //           id="rangePrice1"
    //           type="number"
    //           value={rangePrice1}
    //           onChange={(e) => setRangePrice1(e.target.value)}
    //           placeholder="Enter price for range 10-25"
    //           required
    //           className="border border-[#B1C7E5] rounded-md p-2 w-full"
    //         />
    //       </div>

    //       {/* Range 2 */}
    //       <div>
    //         <label htmlFor="rangePrice2" className="text-sm font-medium">
    //           Price for Quantity 25 to 50
    //         </label>
    //         <input
    //           id="rangePrice2"
    //           type="number"
    //           value={rangePrice2}
    //           onChange={(e) => setRangePrice2(e.target.value)}
    //           placeholder="Enter price for range 25-50"
    //           required
    //           className="border border-[#B1C7E5] rounded-md p-2 w-full"
    //         />
    //       </div>

    //       {/* Range 3 */}
    //       <div>
    //         <label htmlFor="rangePrice3" className="text-sm font-medium">
    //           Price for Quantity 50 to 200
    //         </label>
    //         <input
    //           id="rangePrice3"
    //           type="number"
    //           value={rangePrice3}
    //           onChange={(e) => setRangePrice3(e.target.value)}
    //           placeholder="Enter price for range 50-200"
    //           required
    //           className="border border-[#B1C7E5] rounded-md p-2 w-full"
    //         />
    //       </div>
    //     </div>
    //   )}






    //         {/* Dropdown for Brand Selection */}
    //         <label htmlFor="brand" className="text-sm font-medium">Brand</label>
    //         <select
    //           id="brand"
    //           value={selectedBrandId ?? ''}
    //           onChange={(e) => setSelectedBrandId(Number(e.target.value))}
    //           required
    //           className="border border-[#B1C7E5] rounded-md p-2"
    //         >
    //           <option className='text-sm' value="" disabled>--Select a Brand--</option>
    //           {isBrandsLoading ? (
    //             <option>Loading brands...</option>
    //           ) : brandsError ? (
    //             <option>Error loading brands</option>
    //           ) : (
    //             brands?.results.map((brand: any) => (
    //               <option key={brand.id} value={brand.id}>
    //                 {brand.brand_name}
    //               </option>
    //             ))
    //           )}
    //         </select>

    //         {/* Additional form fields here */}

    //                 {/* Dropdown for Model Selection */}
    //         <label htmlFor="model" className="text-sm font-medium">Model</label>
    //         <select
    //           id="model"
    //           value={selectedModelId ?? ''}
    //           onChange={(e) => setSelectedModelId(Number(e.target.value))}
    //           required
    //           className="border border-[#B1C7E5] rounded-md p-2"
    //         >
    //           <option className='text-sm' value="" disabled>--Select a Model--</option>
    //           {isModelsLoading ? (
    //             <option>Loading models...</option>
    //           ) : modelsError ? (
    //             <option>Error loading models</option>
    //           ) : (
    //             models?.results.map((model: any) => (
    //               <option key={model.id} value={model.id}>
    //                 {model.model_name}
    //               </option>
    //             ))
    //           )}
    //         </select>


    //      {/* Product Price Input */}
    //      <label htmlFor="productPrice" className="text-sm font-medium">Regular/Seller Price</label>
    //     <input
    //       id="productPrice"
    //       type="text"
    //       value={productPrice}
    //       onChange={(e) => setProductPrice(Number(e.target.value))}
    //       placeholder="Enter product price"
    //       required
    //       className="border border-[#B1C7E5] rounded-md p-2"
    //     />

    //     {/* Product Description Input */}
    //     <label htmlFor="productDescription" className="text-sm font-medium">Product Description</label>
    //     <input
    //       id="productDescription"
    //       type="text"
    //       value={productDescription}
    //       onChange={(e) => setProductDescription(e.target.value)}
    //       placeholder="Enter product description"
    //       required
    //       className="border border-[#B1C7E5] rounded-md p-2"
    //     />


    //             {/* Dropdown for Category Selection */}
    //             <label htmlFor="category" className="text-sm font-medium">Category</label>
    //     <select
    //       id="category"
    //       value={selectedCategoryId ?? ''}
    //       onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
    //       required
    //       className="border border-[#B1C7E5] rounded-md p-2"
    //     >
    //       <option className='text-sm' value="" disabled>--Select a Category--</option>
    //       {isCategoriesLoading ? (
    //         <option>Loading categories...</option>
    //       ) : categoriesError ? (
    //         <option>Error loading categories</option>
    //       ) : (
    //         categories?.results.map((category: any) => (
    //           <option key={category.id} value={category.id}>
    //             {category.category_name}
    //           </option>
    //         ))
    //       )}
    //     </select>

    //     {/* Dropdown for Subcategory Selection */}
    //     <label htmlFor="subcategory" className="text-sm font-medium">Subcategory</label>
    //     <select
    //       id="subcategory"
    //       value={selectedSubcategoryId ?? ''}
    //       onChange={(e) => setSelectedSubcategoryId(Number(e.target.value))}
    //       required
    //       className="border border-[#B1C7E5] rounded-md p-2"
    //     >
    //       <option value="" disabled>--Select a Subcategory--</option>
    //       {isSubcategoriesLoading ? (
    //         <option>Loading subcategories...</option>
    //       ) : subcategoriesError ? (
    //         <option>Error loading subcategories</option>
    //       ) : (
    //         subcategories?.map((subcategory: any) => (
    //           <option key={subcategory.id} value={subcategory.id}>
    //             {subcategory.subcategory_name}
    //           </option>
    //         ))
    //       )}
    //     </select>

    //     {/* Dropdown for Childcategory Selection */}
    //     <label htmlFor="childcategory" className="text-sm font-medium">Childcategory</label>
    //     <select
    //       id="childcategory"
    //       value={selectedChildcategoryId ?? ''}
    //       onChange={(e) => setSelectedChildcategoryId(Number(e.target.value))}
    //       required
    //       className="border border-[#B1C7E5] rounded-md p-2"
    //     >
    //       <option value="" disabled>--Select a Childcategory--</option>
    //       {isChildcategoriesLoading ? (
    //         <option>Loading childcategories...</option>
    //       ) : childcategoriesError ? (
    //         <option>Error loading childcategories</option>
    //       ) : (
    //         childcategories?.map((childcategory: any) => (
    //           <option key={childcategory.id} value={childcategory.id}>
    //             {childcategory.childcategory_name}
    //           </option>
    //         ))
    //       )}
    //     </select>


    //     {/* Is Active Toggle */}
    //     <div className="flex items-center">
    //       <label htmlFor="isActive" className="text-sm font-medium mr-3">Active</label>
    //       <input
    //         id="isActive"
    //         type="checkbox"
    //         checked={isActive}
    //         onChange={() => setIsActive(!isActive)}
    //         className="w-4 h-4"
    //         style={{ backgroundColor: '#67c5c3' }}
    //       />
    //     </div>




    //         <button type="submit" className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3" style={{ backgroundColor: '#67c5c3' }} disabled={isLoading}>
    //           {isLoading ? 'Adding...' : 'Add Product'}
    //         </button>

    //         {isError && <p className="text-red-500">Failed to add Product. Please try again.</p>}
    //       </form>
    //     </div>




    //   {/* Right side image preview container */}
    //   <div className="w-full md:w-1/3 flex flex-col items-center">
    //     <label htmlFor="productImage" className="text-sm font-medium">Product Image</label>
    //     <input id="productImage" type="file" onChange={handleImageChange} required className="border border-[#B1C7E5] rounded-md p-2 mb-4" />
    //     {previewImage && (
    //       <div className="border border-[#B1C7E5] p-4 rounded-md mb-4">
    //         <Image src={previewImage} alt="Preview" className="object-cover h-48 w-48 rounded-md" />
    //       </div>
    //     )}

    //     <button
    //       type="button"
    //       onClick={() => document.getElementById("additionalImages")?.click()}
    //       className="text-md text-white px-4 py-2 font-bold rounded-full shadow mb-4"
    //       style={{ backgroundColor: '#67c5c3' }}
    //     >
    //       Add Additional Images
    //     </button>

    //     {/* Hidden file input for additional images */}
    //     <input
    //       id="additionalImages"
    //       type="file"
    //       multiple
    //       onChange={handleAdditionalImagesChange}
    //       className="hidden"
    //     />

    //     <div className="flex flex-col gap-2 mt-4">
    //       {additionalPreviews.map((imageSrc, index) => (
    //         <div key={index} className="relative flex items-center border border-[#B1C7E5] rounded-md p-2 w-32 h-32">
    //           <Image src={imageSrc} alt={`Preview ${index + 1}`} className="object-cover w-full h-full rounded-md" />
    //           <button
    //             type="button"
    //             onClick={() => handleRemoveImage(index)}
    //             className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full transform -translate-x-1 translate-y-1"
    //           >
    //             ×
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //     {/* Button for selecting additional images */}


    //   </div>
    // </div>\
    <div className="container mx-auto py-8">
      <div className=" md:flex-row items-start gap-8">

        {/* Right side image preview container */}
        {/* <div className="w-full md:w-1/3 flex flex-col items-center">
      <label htmlFor="productImage" className="text-sm font-medium">Product Image</label>
      <input id="productImage" type="file" onChange={handleImageChange} required className="border border-[#B1C7E5] rounded-md p-2 mb-4" />
      {previewImage && (
        <div className="border border-[#B1C7E5] p-4 rounded-md mb-4">
          <Image src={previewImage} alt="Preview" className="object-cover h-48 w-48 rounded-md" />
        </div>
      )}

      <button
        type="button"
        onClick={() => document.getElementById("additionalImages")?.click()}
        className="text-md text-white px-4 py-2 font-bold rounded-full shadow mb-4"
        style={{ backgroundColor: '#67c5c3' }}
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

      <div className="flex flex-col gap-2 mt-4">
        {additionalPreviews.map((imageSrc, index) => (
          <div key={index} className="relative flex items-center border border-[#B1C7E5] rounded-md p-2 w-32 h-32">
            <Image src={imageSrc} alt={`Preview ${index + 1}`} className="object-cover w-full h-full rounded-md" />
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
    </div> */}
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
            {additionalPreviews.map((imageSrc, index) => (
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
        {/* Button for selecting additional images */}
        {/* Left side form container */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="productCode" className="text-sm font-medium">Product Code</label>
            <input id="productCode" type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} placeholder="Enter product code" required className="border border-[#B1C7E5] rounded-md p-2" />

            {/* Product Name */}
            <label htmlFor="productName" className="text-sm font-medium">Product Name</label>
            <input id="productName" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" required className="border border-[#B1C7E5] rounded-md p-2" />
            {/* Product Type */}
            <label htmlFor="productType" className="text-sm font-medium">Product Type</label>
            <select id="productType" value={productType} onChange={(e) => setProductType(e.target.value)} required className="border border-[#B1C7E5] rounded-md p-2">
              <option value="" disabled>--Select a Product Type--</option>
              <option value="wholesale">Wholesale</option>
              <option value="regular">Regular</option>
              <option value="seller">Seller</option>
            </select>


            {/* Conditional Inputs for Wholesale */}
            {productType === 'wholesale' && (
              <div className="mt-4 space-y-3">
                {/* Range 1 */}
                <div>
                  <label htmlFor="rangePrice1" className="text-sm font-medium">
                    Price for Quantity 10 to 25
                  </label>
                  <input
                    id="rangePrice1"
                    type="number"
                    value={rangePrice1}
                    onChange={(e) => setRangePrice1(e.target.value)}
                    placeholder="Enter price for range 10-25"
                    required
                    className="border border-[#B1C7E5] rounded-md p-2 w-full"
                  />
                </div>

                {/* Range 2 */}
                <div>
                  <label htmlFor="rangePrice2" className="text-sm font-medium">
                    Price for Quantity 25 to 50
                  </label>
                  <input
                    id="rangePrice2"
                    type="number"
                    value={rangePrice2}
                    onChange={(e) => setRangePrice2(e.target.value)}
                    placeholder="Enter price for range 25-50"
                    required
                    className="border border-[#B1C7E5] rounded-md p-2 w-full"
                  />
                </div>

                {/* Range 3 */}
                <div>
                  <label htmlFor="rangePrice3" className="text-sm font-medium">
                    Price for Quantity 50 to 200
                  </label>
                  <input
                    id="rangePrice3"
                    type="number"
                    value={rangePrice3}
                    onChange={(e) => setRangePrice3(e.target.value)}
                    placeholder="Enter price for range 50-200"
                    required
                    className="border border-[#B1C7E5] rounded-md p-2 w-full"
                  />
                </div>
              </div>
            )}






            {/* Dropdown for Brand Selection */}
            <label htmlFor="brand" className="text-sm font-medium">Brand</label>
            <select
              id="brand"
              value={selectedBrandId ?? ''}
              onChange={(e) => setSelectedBrandId(Number(e.target.value))}
              required
              className="border border-[#B1C7E5] rounded-md p-2"
            >
              <option className='text-sm' value="" disabled>--Select a Brand--</option>
              {isBrandsLoading ? (
                <option>Loading brands...</option>
              ) : brandsError ? (
                <option>Error loading brands</option>
              ) : (
                brands?.results.map((brand: any) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brand_name}
                  </option>
                ))
              )}
            </select>

            {/* Additional form fields here */}

            {/* Dropdown for Model Selection */}
            <label htmlFor="model" className="text-sm font-medium">Model</label>
            <select
              id="model"
              value={selectedModelId ?? ''}
              onChange={(e) => setSelectedModelId(Number(e.target.value))}
              required
              className="border border-[#B1C7E5] rounded-md p-2"
            >
              <option className='text-sm' value="" disabled>--Select a Model--</option>
              {isModelsLoading ? (
                <option>Loading models...</option>
              ) : modelsError ? (
                <option>Error loading models</option>
              ) : (
                models?.results.map((model: any) => (
                  <option key={model.id} value={model.id}>
                    {model.model_name}
                  </option>
                ))
              )}
            </select>


            {/* Product Price Input */}
            <label htmlFor="productPrice" className="text-sm font-medium">Regular/Seller Price</label>
            <input
              id="productPrice"
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              placeholder="Enter product price"
              required
              className="border border-[#B1C7E5] rounded-md p-2"
            />

            {/* Product Description Input */}
            <label htmlFor="productDescription" className="text-sm font-medium">Product Description</label>
            <input
              id="productDescription"
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter product description"
              required
              className="border border-[#B1C7E5] rounded-md p-2"
            />


            {/* Dropdown for Category Selection */}
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select
              id="category"
              value={selectedCategoryId ?? ''}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
              required
              className="border border-[#B1C7E5] rounded-md p-2"
            >
              <option className='text-sm' value="" disabled>--Select a Category--</option>
              {isCategoriesLoading ? (
                <option>Loading categories...</option>
              ) : categoriesError ? (
                <option>Error loading categories</option>
              ) : (
                categories?.results.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))
              )}
            </select>

            {/* Dropdown for Subcategory Selection */}
            <label htmlFor="subcategory" className="text-sm font-medium">Subcategory</label>
            <select
              id="subcategory"
              value={selectedSubcategoryId ?? ''}
              onChange={(e) => setSelectedSubcategoryId(Number(e.target.value))}
              required
              className="border border-[#B1C7E5] rounded-md p-2"
            >
              <option value="" disabled>--Select a Subcategory--</option>
              {isSubcategoriesLoading ? (
                <option>Loading subcategories...</option>
              ) : subcategoriesError ? (
                <option>Error loading subcategories</option>
              ) : (
                subcategories?.map((subcategory: any) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.subcategory_name}
                  </option>
                ))
              )}
            </select>

            {/* Dropdown for Childcategory Selection */}
            <label htmlFor="childcategory" className="text-sm font-medium">Childcategory</label>
            <select
              id="childcategory"
              value={selectedChildcategoryId ?? ''}
              onChange={(e) => setSelectedChildcategoryId(Number(e.target.value))}
              required
              className="border border-[#B1C7E5] rounded-md p-2"
            >
              <option value="" disabled>--Select a Childcategory--</option>
              {isChildcategoriesLoading ? (
                <option>Loading childcategories...</option>
              ) : childcategoriesError ? (
                <option>Error loading childcategories</option>
              ) : (
                childcategories?.map((childcategory: any) => (
                  <option key={childcategory.id} value={childcategory.id}>
                    {childcategory.childcategory_name}
                  </option>
                ))
              )}
            </select>


            {/* Is Active Toggle */}
            <div className="flex items-center">
              <label htmlFor="isActive" className="text-sm font-medium mr-3">Active</label>
              <input
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                className="w-4 h-4"
                style={{ backgroundColor: '#67c5c3' }}
              />
            </div>




            <button type="submit" className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3" style={{ backgroundColor: '#67c5c3' }} disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>

            {isError && <p className="text-red-500">Failed to add Product. Please try again.</p>}
          </form>
        </div>




      </div>
    </div>
  );
};

export default AddProductPage;
