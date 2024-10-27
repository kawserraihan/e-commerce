'use client';

import { useState, useEffect } from 'react';
import { useUpdateModelMutation, useGetBrandsQuery } from '../../../../redux/features/authApiSlice'; // Adjust based on file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: { id: number; model_name: string; is_active: boolean; brandid: number }; // Model data to edit including brandid
}

const EditModelModal = ({ isOpen, onClose, model }: EditModelModalProps) => {
  const [modelName, setModelName] = useState<string>(model.model_name);
  const [isActive, setIsActive] = useState<boolean>(model.is_active);
  const [selectedBrandId, setSelectedBrandId] = useState<number>(model.brandid); // Store selected brand ID
  const [editModel, { isLoading, isError }] = useUpdateModelMutation();

  // Fetch the list of brand for the dropdown
  const { data: brands, isLoading: isBrandsLoading, error: brandsError } = useGetBrandsQuery({ page: 1, page_size: 100 });

  // Sync model data when modal is opened or model changes
  useEffect(() => {
    if (model) {
      setModelName(model.model_name);
      setIsActive(model.is_active);
      setSelectedBrandId(model.brandid); // Set the initial brand ID
    }
  }, [model]);

  // Handle form submission to edit the model
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editModel({ 
        id: model.id, 
        model_name: modelName, 
        is_active: isActive, 
        brandid: selectedBrandId // Submit the updated brand ID
      }).unwrap();
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update model. Please try again.');
      console.error('Error updating model:', error);
    }
  };

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Model</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Model Name Input */}
          <label htmlFor="modelName" className="text-sm font-medium">Model Name</label>
          <input
            id="modelName"
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder="Enter model name"
            required
            className="border border-gray-300 rounded-md p-2"
          />

          {/* Dropdown for brand Selection */}
          <label htmlFor="brand" className="text-sm font-medium">Brand</label>
          <select
            id="brand"
            value={selectedBrandId}
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
            {isLoading ? 'Updating...' : 'Update Model'}
          </button>

          {/* Error Message */}
          {isError && <p className="text-red-500">Failed to update Model. Please try again.</p>}
        </form>

        {/* Close Modal Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModelModal;
