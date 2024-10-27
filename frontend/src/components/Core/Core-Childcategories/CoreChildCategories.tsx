'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetChildcategoriesQuery } from '../../../../redux/features/authApiSlice';
import ToggleButton from '@/components/FormElements/ToggleButton';
import AddChildcategoryModal from './AddChildcategoryModal';
import EditChildcategoryModal from './EditChildcategoryModal';
import DeleteChildcategoryModal from './DeleteChildcategoryModal';

// Childcategory type
interface Childcategory{
	id: number; 
	categoryid: number;
	subcategoryid: number;
	category_name: string;
	subcategory_name: string;
	childcategory_name: string;
	is_active: boolean;        // Add the active status field
  created_at: string;        // Add the created timestamp
  modified_at: string;
}


const ChildcategoriesComponent = () => {
  const router = useRouter();

  // Pagination state
  const [page, setPage] = useState<number>(1); // Current page
  const [pageSize] = useState<number>(10); // Page size

  // Fetch Childcategory from Redux slice
  const { data, isLoading, error } = useGetChildcategoriesQuery({ page, page_size: pageSize });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [childcategoryToEdit, setChildcategoryToEdit] = useState<Childcategory | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [childcategoryToDelete, setChildcategoryToDelete] = useState<Childcategory | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal Handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (childcategory: Childcategory) => {
    setChildcategoryToEdit(childcategory);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setChildcategoryToEdit(null);
  };

  const openDeleteModal = (childcategory: Childcategory) => {
    setChildcategoryToDelete(childcategory);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setChildcategoryToDelete(null);
  };

  // Navigate to view Childcategory details dynamically
  const handleViewChildcategory = (id: number) => {
    router.push(`/core/core-childcategories/${id}`);
  };

  if (isLoading) return <p>Loading childcategory...</p>;
  if (error) return <p>Error loading childcategory.</p>;

  // Filter childcategory based on search query
  const filteredChildcategories = data?.results?.filter((childcategory: Childcategory) =>
    childcategory.childcategory_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total number of pages based on total count and page size
  const totalPages = Math.ceil((data?.count || 0) / pageSize);

  // Function to render page numbers for navigation
  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            page === i ? 'bg-primary text-white' : 'bg-white text-gray-700 border'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      {/* Header with Add New button and Search box */}
      <div className="flex justify-between items-center pb-4">
        <button
          style={{ backgroundColor: '#67c5c3' }}
          className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3"
          onClick={openModal}
        >
          Add New
        </button>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search childcategory"
          className="px-4 py-2 border rounded-md text-sm focus:ring focus:ring-primary"
        />
      </div>

      {/* Table displaying filtered childcategory */}
      <div className="max-w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-center dark:bg-meta-4">
              <th className="min-w-[30px] px-1 py-4 text-sm text-black dark:text-white">No.</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">ChildCategory Name</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Category Name</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">SubCategory Name</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Status</th>
              <th className="min-w-[100px] px-5 py-4 text-sm text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChildcategories?.map((item, rowIndex) => (
              <tr key={item.id} className="border-b border-[#eee] dark:border-strokedark">
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{rowIndex + 1}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.childcategory_name}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.category_name}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.subcategory_name}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <ToggleButton 
                    isChecked={item.is_active} 
                    onToggle={(newStatus: boolean) => {}}
                  />
                </td>
                <td className="px-3 py-5 text-center">
                  <div className='space-x-3'>
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleViewChildcategory(item.id)}
                    >
                      View
                    </button>
                    <button
                      className="text-primary hover:underline"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red hover:underline"
                      onClick={() => openDeleteModal(item)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

              {/* Pagination controls with page numbers */}
      <div className="flex justify-end items-center mt-4 mb-4 mr-12 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={!data?.previous}
          className={`px-4 py-2 text-center rounded-md border text-sm font-medium ${
            !data?.previous ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white'
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        <button
          onClick={() => setPage((prevPage) => (data?.next ? prevPage + 1 : prevPage))}
          disabled={!data?.next}
          className={`px-4 py-2 text-center rounded-md border text-sm font-medium ${
            !data?.next ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white'
          }`}
        >
          Next
        </button>
      </div>

        {filteredChildcategories?.length === 0 && (
          <div className="py-4 text-center text-gray-500">
            No childcategory found for "{searchQuery}"
          </div>
        )}
      </div>



      {/* Add Childcategory Modal */}
      <AddChildcategoryModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Edit Childcategory Modal */}
      {childcategoryToEdit && (
        <EditChildcategoryModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          childcategory={childcategoryToEdit}
        />
      )}

      {/* Delete Childcategory Modal */}
      {childcategoryToDelete && (
        <DeleteChildcategoryModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          childcategory={childcategoryToDelete}
        />
      )}
    </div>
  );
};

export default ChildcategoriesComponent;
