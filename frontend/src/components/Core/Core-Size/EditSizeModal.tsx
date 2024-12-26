'use client';

import { useState, useEffect } from 'react';
import { useUpdateSizeMutation, useGetCategoriesQuery, useGetSubcategoriesByCategoryQuery, useGetChildcategoryByCategorySubcategoryQuery } from '../../../../redux/features/authApiSlice'; // Adjust based on file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  size: { 
    id: number; 
    size_name: string; 
    is_active: boolean; 
    categoryid: number; 
    subcategoryid: number; 
    childcategoryid: number; 
  }; // Size data to edit including category, subcategory, and childcategory
}

const EditSizeModal = ({ isOpen, onClose, size }: EditSizeModalProps) => {
  const [sizeName, setSizeName] = useState<string>(size.size_name);
  const [isActive, setIsActive] = useState<boolean>(size.is_active);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(size.categoryid); // Store selected category ID
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number>(size.subcategoryid); // Store selected subcategory ID
  const [selectedChildcategoryId, setSelectedChildcategoryId] = useState<number>(size.childcategoryid); // Store selected childcategory ID
  const [editSize, { isLoading, isError }] = useUpdateSizeMutation();

  // Fetch the list of categories for the dropdown
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 });

  // Fetch subcategories based on selected category
  const { data: subcategories, isLoading: isSubcategoriesLoading, error: subcategoriesError } = useGetSubcategoriesByCategoryQuery(
    selectedCategoryId ?? 0, 
    { skip: !selectedCategoryId }
  );

  // Fetch childcategories based on selected category and subcategory
  const { data: childcategories, isLoading: isChildcategoriesLoading, error: childcategoriesError } = useGetChildcategoryByCategorySubcategoryQuery(
    { categoryid: selectedCategoryId, subcategoryid: selectedSubcategoryId },
    { skip: !selectedCategoryId || !selectedSubcategoryId }
  );

  // Sync size data when modal is opened or size changes
  useEffect(() => {
    if (size) {
      setSizeName(size.size_name);
      setIsActive(size.is_active);
      setSelectedCategoryId(size.categoryid); // Set the initial category ID
      setSelectedSubcategoryId(size.subcategoryid); // Set the initial subcategory ID
      setSelectedChildcategoryId(size.childcategoryid); // Set the initial childcategory ID
    }
  }, [size]);

  // Handle form submission to edit the size
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editSize({ 
        id: size.id, 
        size_name: sizeName, 
        is_active: isActive, 
        categoryid: selectedCategoryId, // Submit the updated category ID
        subcategoryid: selectedSubcategoryId, // Submit the updated subcategory ID
        childcategoryid: selectedChildcategoryId // Submit the updated childcategory ID
      }).unwrap();
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update Size. Please try again.');
      console.error('Error updating size:', error);
    }
  };

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Size</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Size Name Input */}
          <label htmlFor="sizeName" className="text-sm font-medium">Size Name</label>
          <input
            id="sizeName"
            type="text"
            value={sizeName}
            onChange={(e) => setSizeName(e.target.value)}
            placeholder="Enter size name"
            required
            className="border border-[#B1C7E5] rounded-md p-2"
          />

          {/* Dropdown for Category Selection */}
          <label htmlFor="category" className="text-sm font-medium">Category</label>
          <select
            id="category"
            value={selectedCategoryId}
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

          {/* Dropdown for SubCategory Selection */}
          <label htmlFor="subcategory" className="text-sm font-medium">SubCategory</label>
            <select
            id="subcategory"
            value={selectedSubcategoryId}
            onChange={(e) => setSelectedSubcategoryId(Number(e.target.value))}
            required
            className="border border-[#B1C7E5] rounded-md p-2"
            >
            <option className='text-sm' value="" disabled>--Select a SubCategory--</option>
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
          <label htmlFor="childcategory" className="text-sm font-medium">ChildCategory</label>
          <select
            id="childcategory"
            value={selectedChildcategoryId}
            onChange={(e) => setSelectedChildcategoryId(Number(e.target.value))}
            required
            className="border border-[#B1C7E5] rounded-md p-2"
          >
            <option className='text-sm' value="" disabled>--Select a ChildCategory--</option>
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

          {/* Active Checkbox */}
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
            className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none"
            style={{ backgroundColor: '#67c5c3' }}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Size'}
          </button>

          {/* Error Message */}
          {isError && <p className="text-red-500">Failed to update Size. Please try again.</p>}
        </form>

        {/* Close Modal Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditSizeModal;
