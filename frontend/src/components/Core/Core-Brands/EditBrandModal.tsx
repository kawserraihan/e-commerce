'use client';

import { useState, useEffect } from 'react';
import { useUpdateBrandMutation } from '../../../../redux/features/authApiSlice'; // Adjust based on file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: { id: number; brand_name: string; is_active: boolean }; // Brand data to edit
  
}

const EditBrandModal = ({ isOpen, onClose, brand }: EditBrandModalProps) => {
  const [brandName, setBrandName] = useState<string>(brand.brand_name);
  const [isActive, setIsActive] = useState<boolean>(brand.is_active);
  const [editBrand, { isLoading, isSuccess, isError }] = useUpdateBrandMutation();

  // Sync brand data when modal is opened or brand changes
  useEffect(() => {
    if (brand) {
        setBrandName(brand.brand_name);
      setIsActive(brand.is_active);
    }
  }, [brand]);

  // Handle form submission to edit the brand
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editBrand({ id: brand.id, brand_name: brandName, is_active: isActive }).unwrap();
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update brand. Please try again.');
      console.error('Error updating brand:', error);
    }
  };

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Brand</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* brand Name Input */}
          <label htmlFor="brandName" className="text-sm font-medium">Brand Name</label>
          <input
            id="brandName"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter brandName name"
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
            {isLoading ? 'Updating...' : 'Update Brand'}
          </button>

          {/* Error Message */}
          {isError && <p className="text-red-500">Failed to update Brand. Please try again.</p>}
        </form>

        {/* Close Modal Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditBrandModal;
