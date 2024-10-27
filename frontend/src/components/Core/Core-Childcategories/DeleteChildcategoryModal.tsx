'use client';

import { useDeleteChildcategoryMutation } from '../../../../redux/features/authApiSlice'; // Adjust the import as per your file structure
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DeleteChildcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  childcategory: { id: number; childcategory_name: string }; // Data of the Subcategory to delete
}

const DeleteChildcategoryModal: React.FC<DeleteChildcategoryModalProps> = ({ isOpen, onClose, childcategory }) => {
  const [deleteChildcategory, { isLoading }] = useDeleteChildcategoryMutation();

  const handleDelete = async () => {
    try {
      await deleteChildcategory(childcategory.id).unwrap();
      toast.success('ChildCategory deleted successfully!');
      onClose(); // Close the modal after deletion
      window.location.reload(); // Optional: Refresh the page or update state
    } catch (error) {
      toast.error('Failed to delete Childcategory. Please try again.');
      console.error('Error deleting Childcategory:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Delete Childcategory</h2>
        <p className="mb-6">
          Are you sure you want to delete the Childcategory <strong>{childcategory.childcategory_name}</strong>? This action cannot be undone.
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

export default DeleteChildcategoryModal;
