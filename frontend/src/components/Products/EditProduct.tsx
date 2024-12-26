'use client';

import { useState, useEffect } from 'react';
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
  useGetChildcategoryByCategorySubcategoryQuery,
  useGetBrandsQuery,
  useGetModelsQuery,
} from '../../../redux/features/authApiSlice';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useRouter, useParams } from 'next/navigation';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = useParams();
  // const productId = parseInt(id);
  const productId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

  const { data: product, isLoading: isProductLoading, isError: isProductError } = useGetProductByIdQuery(productId, {
    skip: isNaN(productId), // Skip if the productId is invalid
  });

  const [productName, setProductName] = useState<string>('');
  const [productType, setProductType] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productCode, setProductCode] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0); // Price
  const [isActive, setIsActive] = useState<boolean>(true); // By default, the product is active
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);
  const [selectedChildcategoryId, setSelectedChildcategoryId] = useState<number | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);

  const [updateProduct, { isLoading, isError }] = useUpdateProductMutation();

  // Fetch the list of categories for the dropdown
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 });
  const { data: subcategories, isLoading: isSubcategoriesLoading, error: subcategoriesError } = useGetSubcategoriesByCategoryQuery(
    selectedCategoryId ?? 0,
    { skip: !selectedCategoryId || selectedCategoryId === 0 }
  );
  const { data: childcategories, isLoading: isChildcategoriesLoading, error: childcategoriesError } = useGetChildcategoryByCategorySubcategoryQuery(
    { categoryid: selectedCategoryId ?? 0, subcategoryid: selectedSubcategoryId ?? 0 },
    { skip: !selectedCategoryId || !selectedSubcategoryId }
  );
  const { data: brands, isLoading: isBrandsLoading, error: brandsError } = useGetBrandsQuery({ page: 1, page_size: 100 });
  const { data: models, isLoading: isModelsLoading, error: modelsError } = useGetModelsQuery({ page: 1, page_size: 100 });

  // Populate fields when product data is available
  useEffect(() => {
    if (product) {
      setProductName(product.product_name);
      setProductType(product.product_type);
      setProductDescription(product.product_description);
      setProductCode(product.product_code);
      setProductPrice(product.price);
      setIsActive(product.is_active);
      setSelectedCategoryId(product.category);
      setSelectedSubcategoryId(product.sub_category);
      setSelectedChildcategoryId(product.child_category);
      setSelectedBrandId(product.brand);
      setSelectedModelId(product.model);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId || !selectedSubcategoryId || !selectedChildcategoryId || !selectedBrandId || !selectedModelId) {
      toast.error('Please select all the dropdown fields');
      return;
    }

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
    if (productImage) {
      formData.append('product_image', productImage);
    }

    try {
      await updateProduct({ id: productId, formData: formData }).unwrap();
      toast.success('Product updated successfully!');
      router.push('/products'); // Navigate to the product list page after success
    } catch (error) {
      toast.error('Failed to update Product. Please try again.');
      console.error('Error updating Product:', error);
    }
  };

  if (isProductLoading) return <p>Loading product details...</p>;
  if (isProductError || !product) return <p>Error fetching product data.</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Product Name Input */}
        <label htmlFor="productName" className="text-sm font-medium">Product Name</label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          required
          className="border border-[#B1C7E5] rounded-md p-2"
        />

        {/* Product Code Input */}
        <label htmlFor="productCode" className="text-sm font-medium">Product Code</label>
        <input
          id="productCode"
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          placeholder="Enter product code"
          required
          className="border border-[#B1C7E5] rounded-md p-2"
        />

        {/* Product Type Input */}
        <label htmlFor="productType" className="text-sm font-medium">Product Type</label>
        <select
          id="productType"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          required
          className="border border-[#B1C7E5] rounded-md p-2"
        >
          <option value="" disabled>--Select a Product Type--</option>
          <option value="wholesale">Wholesale</option>
          <option value="regular">Regular</option>
          <option value="seller">Seller</option>
        </select>

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

        {/* Product Image Input */}
        <label htmlFor="productImage" className="text-sm font-medium">Product Image</label>
        <input
          id="productImage"
          type="file"
          onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
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

        {/* Product Price Input */}
        <label htmlFor="productPrice" className="text-sm font-medium">Product Price</label>
        <input
          id="productPrice"
          type="text"
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          placeholder="Enter product price"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3"
          style={{ backgroundColor: '#67c5c3' }}
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Product'}
        </button>

        {isError && <p className="text-red-500">Failed to update Product. Please try again.</p>}
      </form>
    </div>
  );
};

export default EditProductPage;
