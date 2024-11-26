'use client';

import { useState, useEffect } from 'react';
import { useUpdateCouponMutation } from '../../../../redux/features/authApiSlice'; // Adjust the import path as needed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: { 
    id: number; 
    coupon: number; 
    commision: number; 
    minumum_amount: number; 
    is_active: boolean; 
    expiry_at: string | null; 
  }; // Coupon data to edit
}

const EditCouponModal = ({ isOpen, onClose, coupon }: EditCouponModalProps) => {
  const [commission, setCommission] = useState<string>(coupon.commision.toString());
  const [minimumAmount, setMinimumAmount] = useState<string>(coupon.minumum_amount.toString());
  const [expiryDate, setExpiryDate] = useState<string | null>(coupon.expiry_at);
  const [isActive, setIsActive] = useState<boolean>(coupon.is_active);
  const [editCoupon, { isLoading, isError }] = useUpdateCouponMutation();

  // Sync coupon data when modal is opened or coupon changes
  useEffect(() => {
    if (coupon) {
      setCommission(coupon.commision.toString());
      setMinimumAmount(coupon.minumum_amount.toString());
      setExpiryDate(coupon.expiry_at);
      setIsActive(coupon.is_active);
    }
  }, [coupon]);

  // Handle form submission to edit the coupon
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editCoupon({
        id: coupon.id,
        commision: parseFloat(commission),
        minumum_amount: parseFloat(minimumAmount),
        expiry_at: expiryDate ? new Date(expiryDate).toISOString() : null,
        is_active: isActive,
      }).unwrap();
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update coupon. Please try again.');
      console.error('Error updating coupon:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Coupon</h2>
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
            value={expiryDate ? new Date(expiryDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setExpiryDate(e.target.value)}
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
            {isLoading ? 'Updating...' : 'Update Coupon'}
          </button>

          {/* Error Message */}
          {isError && <p className="text-red-500">Failed to update coupon. Please try again.</p>}
        </form>

        {/* Close Modal Button */}
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditCouponModal;
