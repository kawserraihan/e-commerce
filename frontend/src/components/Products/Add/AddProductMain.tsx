"use client";

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

import {
  useAddProductMutation,
  useAddProductImageMutation,
  useAddProductVariantsMutation,
  useAddProductWholesaleMutation,
  useGetCategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
  useGetChildcategoryByCategorySubcategoryQuery,
  useGetBrandsQuery,
  useGetModelsQuery,
} from '../../../../redux/features/authApiSlice';

import ProductBasicInfo from './ProductBasicInfo';
import ProductCategorySelection from './ProductCategorySelection';
import ProductBrandModelSelection from './ProductBrandModelSelection';
import ProductPricingAndStock from './ProductPricingAndStock';
import ProductImageComponent from './ProductImageComponent';
import ProductWholesale from './ProductWholesale';
import ProductVariants from './ProductVariants';
import FormActions from './FormActions';

interface WholesaleRange {
    min_quantity: string;
    max_quantity: string;
    price_per_unit: string;
}

interface FormData {
    productName: string;
    productCode: string;
    productDescription: string;
    productType: string;
    selectedCategoryId: number | null;
    selectedSubcategoryId: number | null;
    selectedChildcategoryId: number | null;
    selectedBrandId: number | null;
    selectedModelId: number | null;
    productPrice: string;
    stockQuantity: string;
    productImage: File | null;
    additionalImages: File[];
    fields: Array<{ colorId: string; sizeId: string; price: string }>;
    wholesaleRanges: WholesaleRange[];
}

const AddProductPage: React.FC = () => {
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
  const role_id = user?.role_id;

  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productCode: '',
    productDescription: '',
    productType: '',
    selectedCategoryId: null,
    selectedSubcategoryId: null,
    selectedChildcategoryId: null,
    selectedBrandId: null,
    selectedModelId: null,
    productPrice: '',
    stockQuantity: '',
    productImage: null,
    additionalImages: [],
    fields: [{ colorId: '', sizeId: '', price: '' }],
    wholesaleRanges: [{ min_quantity: '', max_quantity: '', price_per_unit: '' }],
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  const { data: categories } = useGetCategoriesQuery({ page: 1, page_size: 100 });
  const { data: subcategories } = useGetSubcategoriesByCategoryQuery(
    formData.selectedCategoryId ?? 0,
    { skip: !formData.selectedCategoryId }
  );
  const { data: childcategories } = useGetChildcategoryByCategorySubcategoryQuery(
    { categoryid: formData.selectedCategoryId ?? 0, subcategoryid: formData.selectedSubcategoryId ?? 0 },
    { skip: !formData.selectedCategoryId || !formData.selectedSubcategoryId }
  );
  const { data: brands } = useGetBrandsQuery({ page: 1, page_size: 100 });
  const { data: models } = useGetModelsQuery({ page: 1, page_size: 100 });

  const [addProduct] = useAddProductMutation();
  const [addProductImage] = useAddProductImageMutation();
  const [addProductVariants] = useAddProductVariantsMutation();
  const [addProductWholesale] = useAddProductWholesaleMutation();

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, productImage: file }));
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...filesArray],
      }));
      setAdditionalPreviews((prev) => [
        ...prev,
        ...filesArray.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, idx) => idx !== index),
    }));
    setAdditionalPreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleWholesaleChange = (ranges: WholesaleRange[]) => {
    setFormData((prev) => ({ ...prev, wholesaleRanges: ranges }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      "productName",
      "productCode",
      "productDescription",
      "productType",
      "selectedCategoryId",
      "selectedSubcategoryId",
      "selectedChildcategoryId",
      "selectedBrandId",
      "selectedModelId",
      "productPrice",
      "stockQuantity",
      "productImage",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast.error(`Please fill in the ${field.replace(/([A-Z])/g, " $1")}`);
        return false;
      }
    }

    if (
      formData.productType === "wholesale" &&
      formData.wholesaleRanges.some(
        (range) =>
          !range.min_quantity || !range.max_quantity || !range.price_per_unit
      )
    ) {
      toast.warning("Please fill in all wholesale fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!validateForm()) return;

    try {
      const productFormData = new FormData();
      productFormData.append('product_name', formData.productName);
      productFormData.append('product_code', formData.productCode);
      productFormData.append('product_description', formData.productDescription);
      productFormData.append('product_type', formData.productType);
      productFormData.append('quantity', formData.stockQuantity);
      productFormData.append('price', formData.productPrice);
      if (formData.productImage) {
        productFormData.append('product_image', formData.productImage);
      }
      if (role_id === 1) {
        productFormData.append('is_active', 'true');
      }

      productFormData.append('category', formData.selectedCategoryId?.toString() ?? '');
      productFormData.append('sub_category', formData.selectedSubcategoryId?.toString() ?? '');
      productFormData.append('child_category', formData.selectedChildcategoryId?.toString() ?? '');
      productFormData.append('brand', formData.selectedBrandId?.toString() ?? '');
      productFormData.append('model', formData.selectedModelId?.toString() ?? '');

      const productResponse = await addProduct(productFormData).unwrap();
      const productId = productResponse.id;

      for (const image of formData.additionalImages) {
        const imageFormData = new FormData();
        imageFormData.append('product', productId.toString());
        imageFormData.append('image', image);
        await addProductImage(imageFormData).unwrap();
      }

      for (const field of formData.fields) {
        if (field.colorId && field.sizeId && field.price) {
          const variantFormData = new FormData();
          variantFormData.append('product', productId.toString());
          variantFormData.append('color', field.colorId.toString());
          variantFormData.append('size', field.sizeId.toString());
          variantFormData.append('price', field.price);
          await addProductVariants(variantFormData).unwrap();
        }
      }

      for (const range of formData.wholesaleRanges) {
        if (range.min_quantity && range.max_quantity && range.price_per_unit) {
          const wholesaleFormData = new FormData();
          wholesaleFormData.append('product', productId.toString());
          wholesaleFormData.append('min_quantity', range.min_quantity);
          wholesaleFormData.append('max_quantity', range.max_quantity);
          wholesaleFormData.append('price_per_unit', range.price_per_unit);
          await addProductWholesale(wholesaleFormData).unwrap();
        }
      }

      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add product.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Section */}
        <div className="space-y-4">
        <ProductBasicInfo
            productName={formData.productName}
            productCode={formData.productCode}
            productDescription={formData.productDescription}
            productType={formData.productType}
            onChange={(key: string, value: any) =>
                setFormData((prev) => ({ ...prev, [key]: value }))
              }
            />

            {formData.productType === "wholesale" && (
            <ProductWholesale
                wholesaleRanges={formData.wholesaleRanges}
                onChange={handleWholesaleChange}
            />
            )}
          <ProductPricingAndStock
            productPrice={formData.productPrice}
            stockQuantity={formData.stockQuantity}
            onChange={handleChange}
          />
          <ProductVariants
            fields={formData.fields}
            onChange={(fields) => handleChange('fields', fields)}
          />
        </div>
        {/* Right Section */}
        <div className="space-y-4">
          <ProductImageComponent
            additionalPreviews={additionalPreviews}
            previewImage={previewImage}
            handleImageChange={handleImageChange}
            handleAdditionalImagesChange={handleAdditionalImagesChange}
            handleRemoveImage={handleRemoveImage}
          />
          <ProductCategorySelection
            selectedCategoryId={formData.selectedCategoryId}
            selectedSubcategoryId={formData.selectedSubcategoryId}
            selectedChildcategoryId={formData.selectedChildcategoryId}
            categories={categories?.results.map((cat: any) => ({
              id: cat.id,
              name: cat.category_name,
            })) || []}
            subcategories={subcategories?.map((subcat: any) => ({
              id: subcat.id,
              name: subcat.subcategory_name,
            })) || []}
            childcategories={childcategories?.map((childcat: any) => ({
              id: childcat.id,
              name: childcat.childcategory_name,
            })) || []}
            onChange={handleChange}
          />
          <ProductBrandModelSelection
            selectedBrandId={formData.selectedBrandId}
            selectedModelId={formData.selectedModelId}
            brands={brands?.results.map((brand: any) => ({
              id: brand.id,
              name: brand.brand_name,
            })) || []}
            models={models?.results.map((model: any) => ({
              id: model.id,
              name: model.model_name,
            })) || []}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
        <FormActions isLoading={false} />
      </div>
      </form>

    </div>
  );
};

export default AddProductPage;
