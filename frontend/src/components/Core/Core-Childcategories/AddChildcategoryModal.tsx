'use client';

import { useState, useEffect } from 'react';
import { useAddChildcategoryMutation, useGetCategoriesQuery, useGetSubcategoriesByCategoryQuery } from '../../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

interface AddChildcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChildcategoryModal = ({ isOpen, onClose }: AddChildcategoryModalProps) => {
  const [childcategoryName, setChildcategoryName] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true); // By default, the Childcategory is active
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // State for the selected category ID
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null); // State for the selected subcategory ID
  const [addChildcategory, { isLoading, isError }] = useAddChildcategoryMutation();
  
  // Fetch the list of categories for the dropdown
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 }); // Fetch the first 100 categories, adjust if needed
  // Fetch subcategories based on selected category
  const { data: subcategories, isLoading: isSubcategoriesLoading, error: subcategoriesError, refetch } = useGetSubcategoriesByCategoryQuery(
    selectedCategoryId ?? 0, // Provide a default value (like 0) if selectedCategoryId is null
    {
      skip: !selectedCategoryId || selectedCategoryId === 0, // Skip if no valid category ID is selected
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId || !selectedSubcategoryId) {
      toast.error('Please select both category and subcategory.');
      return;
    }

    try {
      await addChildcategory({
        childcategory_name: childcategoryName,
        is_active: isActive,
        categoryid: selectedCategoryId, // Send the selected category ID
        subcategoryid: selectedSubcategoryId, // Send the selected Subcategory ID
      }).unwrap();

      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      toast.error('Failed to add Childcategory. Please try again.'); // Show error toast
      console.error('Error adding Childbcategory:', error);
    }
  };

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Childcategory</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Childcategory Name Input */}
          <label htmlFor="childcategoryName" className="text-sm font-medium">Childcategory Name</label>
          <input
            id="childcategoryName"
            type="text"
            value={childcategoryName}
            onChange={(e) => setChildcategoryName(e.target.value)}
            placeholder="Enter Childcategory name"
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

          {/* Dropdown for Category Selection */}
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
            {isLoading ? 'Adding...' : 'Add Childcategory'}
          </button>

          {isError && <p className="text-red-500">Failed to add Childcategory. Please try again.</p>}
        </form>

        {/* Close Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddChildcategoryModal;
