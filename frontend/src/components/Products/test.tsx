'use client';

import { useState } from 'react';
import {
  useAddProductMutation,
  useAddProductImageMutation,
  useGetCategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
} from '../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS
import Image from "next/image";

const AddProductPage = () => {
  const [productName, setProductName] = useState<string>('');
  const [productType, setProductType] = useState<string>('');
  const [productCode, setProductCode] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0); // Price
  const [isActive, setIsActive] = useState<boolean>(true); // By default, the product is active
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // State for the selected category ID
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null); // State for the selected subcategory ID
  const [productImage, setProductImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]); // Additional product images

  const [addProduct, { isLoading, isError }] = useAddProductMutation();
  const [addProductImage] = useAddProductImageMutation(); // Add additional images mutation

  // Fetch the list of categories for the dropdown
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 }); // Fetch the first 100 categories, adjust if needed

  // Fetch subcategories based on selected category
  const { data: subcategories, isLoading: isSubcategoriesLoading, error: subcategoriesError } = useGetSubcategoriesByCategoryQuery(
    selectedCategoryId ?? 0, // Provide a default value (like 0) if selectedCategoryId is null
    {
      skip: !selectedCategoryId || selectedCategoryId === 0, // Skip if no valid category ID is selected
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId || !selectedSubcategoryId) {
      toast.error('Please select all the dropdown fields');
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_type', productType);
    formData.append('product_code', productCode);
    formData.append('product_description', productDescription);
    formData.append('price', productPrice.toString());
    formData.append('is_active', isActive.toString());
    formData.append('category', selectedCategoryId.toString());
    formData.append('sub_category', selectedSubcategoryId.toString());

    // Append product image only if it exists
    if (productImage) {
      formData.append('product_image', productImage); // Append the image file
    }

    try {
      const newProduct = await addProduct(formData).unwrap();

      // Add additional images if they exist
      if (additionalImages.length > 0) {
        const imageFormData = new FormData();
        additionalImages.forEach((image, index) => {
          imageFormData.append(`image_${index}`, image);
        });
        imageFormData.append('product', newProduct.id.toString()); // Associate with the created product
        await addProductImage(imageFormData);
      }

      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add Product. Please try again.');
      console.error('Error adding Product:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

{/* Product Code Input */}
<label htmlFor="productCode" className="text-sm font-medium">Product Code</label>
<input
  id="productCode"
  type="text"
  value={productCode}
  onChange={(e) => setProductCode(e.target.value)}
  placeholder="Enter product code"
  required
  className="border border-gray-300 rounded-md p-2"
/>

{/* Product Name Input */}
<label htmlFor="productName" className="text-sm font-medium">Product Name</label>
<input
  id="productName"
  type="text"
  value={productName}
  onChange={(e) => setProductName(e.target.value)}
  placeholder="Enter product name"
  required
  className="border border-gray-300 rounded-md p-2"
/>

{/* Product Type Input */}
<label htmlFor="productType" className="text-sm font-medium">Product Type</label>
<select
  id="productType"
  value={productType}
  onChange={(e) => setProductType(e.target.value)}
  required
  className="border border-gray-300 rounded-md p-2"
>
  <option value="" disabled>--Select a Product Type--</option>
  <option value="wholesale">Wholesale</option>
  <option value="regular">Regular</option>
  <option value="seller">Seller</option>
</select>


        {/* Product Description Input */}
        <label htmlFor="productDescription" className="text-sm font-medium">Product Description</label>
        <input
          id="productDescription"
          type="text"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Enter product description"
          required
          className="border border-gray-300 rounded-md p-2"
        />

{/* Product Image Input */}
<label htmlFor="productImage" className="text-sm font-medium">Primary Product Image</label>
<input
  id="productImage"
  type="file"
  onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
  required
  className="border border-gray-300 rounded-md p-2"
/>

{/* Preview Primary Image */}
{productImage && (
  <div className="mt-2">
    <h2 className="text-sm font-medium">Primary Image Preview:</h2>
    <Image
      src={URL.createObjectURL(productImage)}
      alt="Primary product preview"
      className="w-32 h-32 object-cover rounded"
    />
  </div>
)}

{/* Additional Images Input */}
<label htmlFor="additionalImages" className="text-sm font-medium">Additional Product Images</label>
<input
  id="additionalImages"
  type="file"
  multiple
  onChange={(e) => {
    if (e.target.files) {
      setAdditionalImages(Array.from(e.target.files)); // Convert FileList to an array
    }
  }}
  className="border border-gray-300 rounded-md p-2"
/>

{/* Preview Additional Images */}
{additionalImages.length > 0 && (
  <div className="mt-2">
    <h2 className="text-sm font-medium">Additional Images Preview:</h2>
    <div className="grid grid-cols-3 gap-2">
      {Array.from(additionalImages).map((image, index) => (
        <Image
          key={index}
          src={URL.createObjectURL(image)}
          alt={`Additional image ${index + 1}`}
          className="w-32 h-32 object-cover rounded"
        />
      ))}
    </div>
  </div>
)}

{/* Product Price Input */}
<label htmlFor="productPrice" className="text-sm font-medium">Product Price</label>
<input
  id="productPrice"
  type="text"
  value={productPrice}
  onChange={(e) => setProductPrice(Number(e.target.value))}
  placeholder="Enter product price"
  required
  className="border border-gray-300 rounded-md p-2"
/>

{/* Dropdown for Category Selection */}
<label htmlFor="category" className="text-sm font-medium">Category</label>
<select
  id="category"
  value={selectedCategoryId ?? ''}
  onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
  required
  className="border border-gray-300 rounded-md p-2"
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
  className="border border-gray-300 rounded-md p-2"
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

{/* Submit Button */}
<button
  type="submit"
  className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3"
  style={{ backgroundColor: '#67c5c3' }}
  disabled={isLoading}
>
  {isLoading ? 'Adding...' : 'Add Product'}
</button>

{isError && <p className="text-red-500">Failed to add Product. Please try again.</p>}
</form>    </div>
  );
};

export default AddProductPage;
