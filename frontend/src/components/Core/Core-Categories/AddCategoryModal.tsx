'use client';

import { useState } from 'react';
import { useAddCategoryMutation } from '../../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({ isOpen, onClose }: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true); // By default, the category is active
  const [addCategory, { isLoading, isSuccess, isError }] = useAddCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await addCategory({ category_name: categoryName, is_active: isActive }).unwrap();
         // Show success toast
        window.location.reload();
        // toast.success('Category added successfully!');
     // Trigger parent function to close the modal and refresh
      } catch (error) {
        toast.error('Failed to add category. Please try again.'); // Show error toast
        console.error('Error adding category:', error);
      }
    };

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
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
          <button type="submit" className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3" style={{ backgroundColor: '#67c5c3' }} disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Category'}
          </button>

          {/* Success and Error Messages */}
          {/* {isSuccess && <p className="text-green-500">Category added successfully!</p>} */}
          {isError && <p className="text-red-500">Failed to add category. Please try again.</p>}
        </form>

        {/* Close Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddCategoryModal;