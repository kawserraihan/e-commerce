'use client';

import { useState, useEffect } from 'react';
import { useUpdateChildcategoryMutation, useGetSubcategoriesQuery, useGetCategoriesQuery } from '../../../../redux/features/authApiSlice'; // Adjust based on file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditChildcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  childcategory: { id: number; childcategory_name: string; is_active: boolean; categoryid: number; subcategoryid: number }; // Childcategory data to edit including categoryid & subcategory
}

const EditChildcategoryModal = ({ isOpen, onClose, childcategory }: EditChildcategoryModalProps) => {
  const [childcategoryName, setChildcategoryName] = useState<string>(childcategory.childcategory_name);
  const [isActive, setIsActive] = useState<boolean>(childcategory.is_active);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(childcategory.categoryid); // Store selected category ID
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number>(childcategory.subcategoryid); // Store selected Subcategory ID
  const [editChildcategory, { isLoading, isError }] = useUpdateChildcategoryMutation();

  // Fetch the list of categories & subcategories for the dropdown
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 });
  const { data: subcategories, isLoading: isSubcategoriesLoading, error: subcategoriesError } = useGetSubcategoriesQuery({ page: 1, page_size: 100 });

  // Sync childcategory data when modal is opened or childcategory changes
  useEffect(() => {
    if (childcategory) {
      setChildcategoryName(childcategory.childcategory_name);
      setIsActive(childcategory.is_active);
      setSelectedCategoryId(childcategory.categoryid); // Set the initial category ID
    }
  }, [childcategory]);

  // Handle form submission to edit the subcategory
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editChildcategory({ 
        id: childcategory.id, 
        childcategory_name: childcategoryName, 
        is_active: isActive, 
        categoryid: selectedCategoryId, // Submit the updated category ID
        subcategoryid: selectedSubcategoryId // Submit the updated subcategory ID
      }).unwrap();
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update Childcategory. Please try again.');
      console.error('Error updating childcategory:', error);
    }
  };

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Childcategory</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Childcategory Name Input */}
          <label htmlFor="childcategoryName" className="text-sm font-medium">Childcategory Name</label>
          <input
            id="childcategoryName"
            type="text"
            value={childcategoryName}
            onChange={(e) => setChildcategoryName(e.target.value)}
            placeholder="Enter childcategory name"
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
              subcategories?.results.map((subcategory: any) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.subcategory_name}
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
            {isLoading ? 'Updating...' : 'Update Subcategory'}
          </button>

          {/* Error Message */}
          {isError && <p className="text-red-500">Failed to update Subcategory. Please try again.</p>}
        </form>

        {/* Close Modal Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditChildcategoryModal;
