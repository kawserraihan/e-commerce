'use client';

import { useState } from 'react';
import { useAddCouponMutation } from '../../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCouponModal = ({ isOpen, onClose }: AddCouponModalProps) => {
  const [commission, setCommission] = useState<string>('');
  const [minimumAmount, setMinimumAmount] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);

  const [addCoupon, { isLoading, isError }] = useAddCouponMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addCoupon({
        commision: parseFloat(commission),
        minumum_amount: parseFloat(minimumAmount),
        expiry_at: expiryDate ? new Date(expiryDate).toISOString() : null,
        is_active: isActive,
      }).unwrap();

      window.location.reload();
    } catch (error) {
      toast.error('Failed to add coupon. Please try again.');
      console.error('Error adding coupon:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Coupon</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Commission Input */}
          <label htmlFor="commission" className="text-sm font-medium">Commission (%)</label>
          <input
            id="commission"
            type="number"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            placeholder="Enter commission percentage"
            required
            className="border border-gray-300 rounded-md p-2"
          />

          {/* Minimum Amount Input */}
          <label htmlFor="minimumAmount" className="text-sm font-medium">Minimum Amount</label>
          <input
            id="minimumAmount"
            type="number"
            value={minimumAmount}
            onChange={(e) => setMinimumAmount(e.target.value)}
            placeholder="Enter minimum amount"
            required
            className="border border-gray-300 rounded-md p-2"
          />

          {/* Expiry Date Input */}
          <label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</label>
          <input
            id="expiryDate"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
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
          <button
            type="submit"
            className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3"
            style={{ backgroundColor: '#67c5c3' }}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Coupon'}
          </button>

          {/* Success and Error Messages */}
          {isError && <p className="text-red-500">Failed to add coupon. Please try again.</p>}
        </form>

        {/* Close Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddCouponModal;
