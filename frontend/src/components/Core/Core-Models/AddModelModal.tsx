'use client';

import { useState, useEffect } from 'react';
import { useAddModelMutation, useGetBrandsQuery } from '../../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

interface AddModelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddModelModal = ({ isOpen, onClose }: AddModelModalProps) => {
  const [modelName, setModelName] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true); // By default, the Model is active
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null); // State for the selected brand ID
  const [addModel, { isLoading, isError }] = useAddModelMutation();
  
  // Fetch the list of brands for the dropdown
  const { data: brands, isLoading: isBrandsLoading, error: brandsError } = useGetBrandsQuery({ page: 1, page_size: 100 }); // Fetch the first 100 brands, adjust if needed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBrandId) {
      toast.error('Please select a brand.');
      return;
    }

    try {
      await addModel({
        model_name: modelName,
        is_active: isActive,
        brandid: selectedBrandId, // Send the selected brand ID
      }).unwrap();

      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      toast.error('Failed to add Model. Please try again.'); // Show error toast
      console.error('Error adding Model:', error);
    }
  };

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Model</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Model Name Input */}
          <label htmlFor="modelName" className="text-sm font-medium">Model Name</label>
          <input
            id="modelName"
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder="Enter Model name"
            required
            className="border border-gray-300 rounded-md p-2"
          />

          {/* Dropdown for Brand Selection */}
          <label htmlFor="Brand" className="text-sm font-medium">Brand</label>
          <select
            id="brand"
            value={selectedBrandId ?? ''}
            onChange={(e) => setSelectedBrandId(Number(e.target.value))}
            required
            className="border border-gray-300 rounded-md p-2"
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
            {isLoading ? 'Adding...' : 'Add Model'}
          </button>

          {isError && <p className="text-red-500">Failed to add Model. Please try again.</p>}
        </form>

        {/* Close Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddModelModal;
