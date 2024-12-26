'use client';

import { useState } from 'react';
import { useAddBrandMutation } from '../../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBrandModal = ({ isOpen, onClose }: AddBrandModalProps) => {
  const [brandName, setBrandName] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true); // By default, the brand is active
  const [addBrand, { isLoading, isSuccess, isError }] = useAddBrandMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await addBrand({ brand_name: brandName, is_active: isActive }).unwrap();
         // Show success toast
        window.location.reload();
        // toast.success('Brand added successfully!');
     // Trigger parent function to close the modal and refresh
      } catch (error) {
        toast.error('Failed to add brand. Please try again.'); // Show error toast
        console.error('Error adding brand:', error);
      }
    };

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Brand</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Brand Name Input */}
          <label htmlFor="brandName" className="text-sm font-medium">Brand Name</label>
          <input
            id="brandName"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter Brand name"
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
            {isLoading ? 'Adding...' : 'Add Brand'}
          </button>

          {/* Success and Error Messages */}
          {/* {isSuccess && <p className="text-green-500">Brand added successfully!</p>} */}
          {isError && <p className="text-red-500">Failed to add brand. Please try again.</p>}
        </form>

        {/* Close Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddBrandModal;