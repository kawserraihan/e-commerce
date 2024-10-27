'use client';

import { useState, useEffect } from 'react';
import { useAddSizeMutation, useGetCategoriesQuery, useGetSubcategoriesByCategoryQuery, useGetChildcategoryByCategorySubcategoryQuery } from '../../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

interface AddSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSizeModal = ({ isOpen, onClose }: AddSizeModalProps) => {
  const [sizeName, setSizeName] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true); // By default, the size is active
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // State for the selected category ID
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null); // State for the selected subcategory ID
  const [selectedChildcategoryId, setSelectedChildcategoryId] = useState<number | null>(null); // State for the selected childcategory ID
  const [addSize, { isLoading, isError }] = useAddSizeMutation();
  
  // Fetch the list of categories for the dropdown
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 }); // Fetch the first 100 categories, adjust if needed

  // Fetch subcategories based on selected category
  const { data: subcategories, isLoading: isSubcategoriesLoading, error: subcategoriesError } = useGetSubcategoriesByCategoryQuery(
    selectedCategoryId ?? 0, // Provide a default value (like 0) if selectedCategoryId is null
    {
      skip: !selectedCategoryId || selectedCategoryId === 0, // Skip if no valid category ID is selected
    }
  );

  // Fetch child categories based on selected category and subcategory
  const { data: childcategories, isLoading: isChildcategoriesLoading, error: childcategoriesError } = useGetChildcategoryByCategorySubcategoryQuery(
    { categoryid: selectedCategoryId ?? 0, subcategoryid: selectedSubcategoryId ?? 0 },
    {
      skip: !selectedCategoryId || !selectedSubcategoryId, // Skip if no valid category or subcategory is selected
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId || !selectedSubcategoryId || !selectedChildcategoryId) {
      toast.error('Please select category, subcategory, and childcategory.');
      return;
    }

    try {
      await addSize({
        size_name: sizeName,
        is_active: isActive,
        categoryid: selectedCategoryId, // Send the selected category ID
        subcategoryid: selectedSubcategoryId, // Send the selected Subcategory ID
        childcategoryid: selectedChildcategoryId, // Send the selected Childcategory ID
      }).unwrap();

      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      toast.error('Failed to add Size. Please try again.'); // Show error toast
      console.error('Error adding Size:', error);
    }
  };

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Size</h2>

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

          {/* Dropdown for Childcategory Selection */}
          <label htmlFor="childcategory" className="text-sm font-medium">Childcategory</label>
          <select
            id="childcategory"
            value={selectedChildcategoryId ?? ''}
            onChange={(e) => setSelectedChildcategoryId(Number(e.target.value))}
            required
            className="border border-gray-300 rounded-md p-2"
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
            {isLoading ? 'Adding...' : 'Add Size'}
          </button>

          {isError && <p className="text-red-500">Failed to add Size. Please try again.</p>}
        </form>

        {/* Close Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddSizeModal;
