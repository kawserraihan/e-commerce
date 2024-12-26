'use client';

import { useState, useEffect } from 'react';
import { useUpdateCategoryMutation } from '../../../../redux/features/authApiSlice'; // Adjust based on file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: { id: number; category_name: string; is_active: boolean }; // Category data to edit
  // editCategory: (category: { id: number, category_name: string, is_active: boolean }) => void;
}

const EditCategoryModal = ({ isOpen, onClose, category }: EditCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState<string>(category.category_name);
  const [isActive, setIsActive] = useState<boolean>(category.is_active);
  const [editCategory, { isLoading, isSuccess, isError }] = useUpdateCategoryMutation();

  // Sync category data when modal is opened or category changes
  useEffect(() => {
    if (category) {
      setCategoryName(category.category_name);
      setIsActive(category.is_active);
    }
  }, [category]);

  // Handle form submission to edit the category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editCategory({ id: category.id, category_name: categoryName, is_active: isActive }).unwrap();
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update category. Please try again.');
      console.error('Error updating category:', error);
    }
  };

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Category Name Input */}
          <label htmlFor="categoryName" className="text-sm font-medium">Category Name</label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
            className="border border-[#B1C7E5] rounded-md p-2"
          />

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
            {isLoading ? 'Updating...' : 'Update Category'}
          </button>

          {/* Error Message */}
          {isError && <p className="text-red-500">Failed to update category. Please try again.</p>}
        </form>

        {/* Close Modal Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditCategoryModal;
