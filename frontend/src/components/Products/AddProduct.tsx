'use client';
import { useState } from 'react';
import {
  useAddProductMutation,
  useAddProductImageMutation,
  useGetCategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
  useGetChildcategoryByCategorySubcategoryQuery,
  useGetBrandsQuery,
  useGetModelsQuery,
  useAddProductVariantsMutation,
  useAddProductWholesaleMutation,
} from '../../../redux/features/authApiSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductImageComponent from './ProductImageComponent';
import ColorSize from './ColorSize';
import Cookies from 'js-cookie';

const AddProductPage = () => {
  const userCookie = Cookies.get('user');
  const user = JSON.parse(decodeURIComponent(userCookie));
  let { role_id } = user;

  const [productName, setProductName] = useState<string>('');
  const [productType, setProductType] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productCode, setProductCode] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);
  const [selectedChildcategoryId, setSelectedChildcategoryId] = useState<number | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);

  const [productImage, setProductImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  //select sizes and color
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [fields, setFields] = useState([
    { colorId: '', sizeId: '', price: '', discount: '', stockQuantity: '', variantImage: null | File },
  ]);

  // Additional states for multiple images
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  const [addProduct, { isLoading, isError }] = useAddProductMutation();
  const [addProductImage] = useAddProductImageMutation();
  const [addProductVariants] = useAddProductVariantsMutation();
  const [addProductWholesale] = useAddProductWholesaleMutation();

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 });
  const { data: subcategories, isLoading: isSubcategoriesLoading, error: subcategoriesError } = useGetSubcategoriesByCategoryQuery(selectedCategoryId ?? 0, { skip: !selectedCategoryId || selectedCategoryId === 0 });
  const { data: childcategories, isLoading: isChildcategoriesLoading, error: childcategoriesError } = useGetChildcategoryByCategorySubcategoryQuery({ categoryid: selectedCategoryId ?? 0, subcategoryid: selectedSubcategoryId ?? 0 }, { skip: !selectedCategoryId || !selectedSubcategoryId });
  const { data: brands, isLoading: isBrandsLoading, error: brandsError } = useGetBrandsQuery({ page: 1, page_size: 100 });
  const { data: models, isLoading: isModelsLoading, error: modelsError } = useGetModelsQuery({ page: 1, page_size: 100 });

  const [wholesaleRanges, setWholesaleRanges] = useState([
    { min_quantity: '', max_quantity: '', price_per_unit: '' },
  ]);

  // Function to handle changes in the wholesale range input fields
  const handleRangeChange = (index: number, field: string, value: string) => {
    const updatedRanges = wholesaleRanges.map((range, idx) =>
      idx === index ? { ...range, [field]: value } : range
    );
    setWholesaleRanges(updatedRanges);
  };

  // Function to add a new wholesale range input field
  const addMoreWholesaleRange = () => {
    setWholesaleRanges([
      ...wholesaleRanges,
      { min_quantity: '', max_quantity: '', price_per_unit: '' },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate if all dropdowns are selected
    if (!selectedCategoryId || !selectedSubcategoryId || !selectedChildcategoryId || !selectedBrandId || !selectedModelId) {
      toast.error('Please select all the dropdown fields');
      return;
    }
    // Validate that for every selected color/size, price is also provided
    const incompleteFields = fields.some((field) => {
      const { colorId, sizeId, price } = field;
      return (
        (colorId && (!sizeId || !price)) ||
        (sizeId && (!colorId || !price))
      );
    });
    if (incompleteFields) {
      toast.error('Please ensure that Color, Size, and Price are all provided together.');
      return;
    }
    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_type', productType);
    formData.append('product_description', productDescription);
    formData.append('product_code', productCode);
    formData.append('quantity', stockQuantity);
    formData.append('product_image', productImage);
    formData.append('price', productPrice.toString());
    if (role_id === 1) {
      formData.append('is_active', isActive.toString());
    }
    formData.append('category', selectedCategoryId.toString());
    formData.append('sub_category', selectedSubcategoryId.toString());
    formData.append('child_category', selectedChildcategoryId.toString());
    formData.append('brand', selectedBrandId.toString());
    formData.append('model', selectedModelId.toString());
    try {
      // Add the product
      const productResponse = await addProduct(formData).unwrap();
      const productId = productResponse.id;
      // Add additional images
      for (let image of additionalImages) {
        const imageFormData = new FormData();
        imageFormData.append('product', productId.toString());
        imageFormData.append('image', image);
        await addProductImage(imageFormData).unwrap();
      }
      // Add product variants (Color, Size, Price)
      for (let field of fields) {
        if (field.colorId && field.sizeId && field.price) {
          const variantFormData = new FormData();
          variantFormData.append('product', productId.toString());
          variantFormData.append('color', field.colorId);
          variantFormData.append('size', field.sizeId);
          variantFormData.append('price', field.price.toString());
          if (field.variantImage) {
            variantFormData.append('variantImage', field.variantImage);
          }
          await addProductVariants(variantFormData).unwrap();
        }
      }
      // Add wholesale prices (min_quantity, max_quantity, price_per_unit)
      for (let range of wholesaleRanges) {
        if (range.min_quantity && range.max_quantity && range.price_per_unit) {
          const wholesaleFormData = new FormData();
          wholesaleFormData.append('product', productId.toString());
          wholesaleFormData.append('min_quantity', range.min_quantity.toString());
          wholesaleFormData.append('max_quantity', range.max_quantity.toString());
          wholesaleFormData.append('price_per_unit', range.price_per_unit.toString());
          const res = await addProductWholesale(wholesaleFormData).unwrap();
          console.log(res, "Wholesale range added:", range);
        }
      }
      toast.success('Product and variants added successfully!');
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
    <div className="container mx-auto py-8">
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
        {/* right side form container */}
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
              <>
                {wholesaleRanges.map((range, index) => (
                  <div key={index} className="mb-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div>
                        <label className="text-sm font-medium block">Min Quantity</label>
                        <input
                          type="number"
                          value={range.min_quantity}
                          onChange={(e) => handleRangeChange(index, 'min_quantity', e.target.value)}
                          placeholder="Minimum quantity"
                          className="border border-[#B1C7E5] rounded-md p-2 w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block">Max Quantity</label>
                        <input
                          type="number"
                          value={range.max_quantity}
                          onChange={(e) => handleRangeChange(index, 'max_quantity', e.target.value)}
                          placeholder="Maximum quantity"
                          className="border border-[#B1C7E5] rounded-md p-2 w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block">Price Per Unit</label>
                        <input
                          type="number"
                          value={range.price_per_unit}
                          onChange={(e) => handleRangeChange(index, 'price_per_unit', e.target.value)}
                          placeholder="Price per unit"
                          className="border border-[#B1C7E5] rounded-md p-2 w-full"
                        />
                      </div>
                    </div>

                    {/* Add More Button for each range */}
                    {index === wholesaleRanges.length - 1 && (
                      <div className="text-right mt-4">
                        <button
                          type="button"
                          onClick={addMoreWholesaleRange}
                          className="bg-teal-500 text-white text-md px-4 py-2 font-bold rounded-md hover:bg-teal-600"
                        >
                          Add More +
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </>
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
            {/* Product discount Input */}
            <label htmlFor="discount" className="text-sm font-medium">Discount</label>
            <input
              id="discount"
              type="text"
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter product description"
              required
              className="border border-[#B1C7E5] rounded-md p-2"
            />
            {/* Product stock quantity Input */}
            <label htmlFor="stockquantity" className="text-sm font-medium">Stock Quantity</label>
            <input
              id="stockquantity"
              type="text"
              // value={d}
              onChange={(e) => setStockQuantity(e.target.value)}
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

            {role_id === 1 && <div className="flex items-center">
              <label htmlFor="isActive" className="text-sm font-medium mr-3">Active</label>
              <input
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                className="w-4 h-4"
                style={{ backgroundColor: '#67c5c3' }}
              />
            </div>}




            <button type="submit" className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3" style={{ backgroundColor: '#67c5c3' }} disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>

            {isError && <p className="text-red-500">Failed to add Product. Please try again.</p>}
          </form>
        </div>
        {/* left side */}
        <div>
          <ProductImageComponent
            additionalPreviews={additionalPreviews} previewImage={previewImage} handleImageChange={handleImageChange} handleAdditionalImagesChange={handleAdditionalImagesChange} handleRemoveImage={handleRemoveImage}
          />
          {/* select color and size */}
          <ColorSize
            setSelectedSizeId={setSelectedSizeId}
            selectedSizeId={selectedSizeId}
            selectedColorId={selectedColorId}
            setSelectedColorId={setSelectedColorId}
            fields={fields}
            setFields={setFields}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
