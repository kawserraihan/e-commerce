'use client';

import { useState, useEffect } from 'react';
import { useUpdateSubcategoryMutation, useGetCategoriesQuery } from '../../../../redux/features/authApiSlice'; // Adjust based on file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  subcategory: { id: number; subcategory_name: string; is_active: boolean; categoryid: number }; // Subcategory data to edit including categoryid
}

const EditSubcategoryModal = ({ isOpen, onClose, subcategory }: EditSubcategoryModalProps) => {
  const [subcategoryName, setSubcategoryName] = useState<string>(subcategory.subcategory_name);
  const [isActive, setIsActive] = useState<boolean>(subcategory.is_active);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(subcategory.categoryid); // Store selected category ID
  const [editSubcategory, { isLoading, isError }] = useUpdateSubcategoryMutation();

  // Fetch the list of categories for the dropdown
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 });

  // Sync Subcategory data when modal is opened or Subcategory changes
  useEffect(() => {
    if (subcategory) {
      setSubcategoryName(subcategory.subcategory_name);
      setIsActive(subcategory.is_active);
      setSelectedCategoryId(subcategory.categoryid); // Set the initial category ID
    }
  }, [subcategory]);

  // Handle form submission to edit the subcategory
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editSubcategory({ 
        id: subcategory.id, 
        subcategory_name: subcategoryName, 
        is_active: isActive, 
        categoryid: selectedCategoryId // Submit the updated category ID
      }).unwrap();
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update Subcategory. Please try again.');
      console.error('Error updating Subcategory:', error);
    }
  };

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Subcategory</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Subcategory Name Input */}
          <label htmlFor="subcategoryName" className="text-sm font-medium">Subcategory Name</label>
          <input
            id="subcategoryName"
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            placeholder="Enter subcategory name"
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

export default EditSubcategoryModal;
