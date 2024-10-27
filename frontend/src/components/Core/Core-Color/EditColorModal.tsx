'use client';

import { useState, useEffect } from 'react';
import { useUpdateColorMutation } from '../../../../redux/features/authApiSlice'; // Adjust based on file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  color: { id: number; color_name: string; is_active: boolean }; // Color data to edit
  
}

const EditColorModal = ({ isOpen, onClose, color }: EditColorModalProps) => {
  const [colorName, setColorName] = useState<string>(color.color_name);
  const [isActive, setIsActive] = useState<boolean>(color.is_active);
  const [editColor, { isLoading, isSuccess, isError }] = useUpdateColorMutation();

  // Sync color data when modal is opened or color changes
  useEffect(() => {
    if (color) {
      setColorName(color.color_name);
      setIsActive(color.is_active);
    }
  }, [color]);

  // Handle form submission to edit the color
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editColor({ id: color.id, color_name: colorName, is_active: isActive }).unwrap();
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update color. Please try again.');
      console.error('Error updating color:', error);
    }
  };

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Color</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Color Name Input */}
          <label htmlFor="colorName" className="text-sm font-medium">Color Name</label>
          <input
            id="colorName"
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="Enter color name"
            required
            className="border border-gray-300 rounded-md p-2"
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
            {isLoading ? 'Updating...' : 'Update Color'}
          </button>

          {/* Error Message */}
          {isError && <p className="text-red-500">Failed to update color. Please try again.</p>}
        </form>

        {/* Close Modal Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditColorModal;
