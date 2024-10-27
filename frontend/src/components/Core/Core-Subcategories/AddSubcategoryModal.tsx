'use client';

import { useState, useEffect } from 'react';
import { useAddSubcategoryMutation, useGetCategoriesQuery } from '../../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

interface AddSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSubcategoryModal = ({ isOpen, onClose }: AddSubcategoryModalProps) => {
  const [subcategoryName, setSubcategoryName] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true); // By default, the Subcategory is active
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // State for the selected category ID
  const [addSubcategory, { isLoading, isError }] = useAddSubcategoryMutation();
  
  // Fetch the list of categories for the dropdown
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 }); // Fetch the first 100 categories, adjust if needed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId) {
      toast.error('Please select a category.');
      return;
    }

    try {
      await addSubcategory({
        subcategory_name: subcategoryName,
        is_active: isActive,
        categoryid: selectedCategoryId, // Send the selected category ID
      }).unwrap();

      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      toast.error('Failed to add Subcategory. Please try again.'); // Show error toast
      console.error('Error adding Subcategory:', error);
    }
  };

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Subcategory</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Subcategory Name Input */}
          <label htmlFor="subcategoryName" className="text-sm font-medium">Subcategory Name</label>
          <input
            id="subcategoryName"
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            placeholder="Enter Subcategory name"
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
            {isLoading ? 'Adding...' : 'Add Subcategory'}
          </button>

          {isError && <p className="text-red-500">Failed to add Subcategory. Please try again.</p>}
        </form>

        {/* Close Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddSubcategoryModal;
