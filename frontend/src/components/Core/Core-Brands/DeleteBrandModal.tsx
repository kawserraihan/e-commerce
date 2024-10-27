'use client';

import { useDeleteBrandMutation } from '../../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DeleteBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: { id: number; brand_name: string }; // Data of the brand to delete
}

const DeleteBrandModal: React.FC<DeleteBrandModalProps> = ({ isOpen, onClose, brand }) => {
  const [deleteBrand, { isLoading }] = useDeleteBrandMutation();

  const handleDelete = async () => {
    try {
      await deleteBrand(brand.id).unwrap();
      toast.success('Brand deleted successfully!');
      onClose(); // Close the modal after deletion
      window.location.reload(); // Optional: Refresh the page or update state
    } catch (error) {
      toast.error('Failed to delete brand. Please try again.');
      console.error('Error deleting brand:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Delete Brand</h2>
        <p className="mb-6">
          Are you sure you want to delete the brand <strong>{brand.brand_name}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-blue-600 border border-blue-600 font-semibold rounded-full shadow-sm bg-transparent hover:bg-blue-100 focus:outline-none"
            onClick={handleDelete}
            disabled={isLoading}
            
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
          <button
          className="px-4 py-2 text-orange-600 border border-orange-600 font-semibold rounded-full shadow-sm bg-transparent hover:bg-orange-100 focus:outline-none"
          onClick={onClose}
        >
          Cancel
        </button> 

        </div>
      </div>
    </div>
  );
};

export default DeleteBrandModal;
