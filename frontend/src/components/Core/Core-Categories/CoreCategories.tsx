'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCategoriesQuery } from '../../../../redux/features/authApiSlice';
import ToggleButton from '@/components/FormElements/ToggleButton';
import AddCategoryModal from "@/components/Core/Core-Categories/AddCategoryModal";
import EditCategoryModal from "@/components/Core/Core-Categories/EditCategoryModal";
import DeleteCategoryModal from "@/components/Core/Core-Categories/DeleteCategoryModal";

// Categories type
interface Category {
  id: number;
  category_name: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

const CategoriesComponent = () => {
  const router = useRouter();

  // Pagination state
  const [page, setPage] = useState<number>(1); // Current page
  const [pageSize] = useState<number>(10); // Page size

  // Fetch Categories from Redux slice
  const { data, isLoading, error } = useGetCategoriesQuery({ page, page_size: pageSize });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal Handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (category: Category) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCategoryToEdit(null);
  };

  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  // Navigate to view Category details dynamically
  const handleViewCategory = (id: number) => {
    router.push(`/core/core-categories/${id}`);
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories.</p>;

  // Filter categories based on search query
  const filteredCategories= data?.results?.filter((category: Category) =>
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder="Search Categories"
          className="px-4 py-2 border rounded-md text-sm focus:ring focus:ring-primary"
        />
      </div>

      {/* Table displaying filtered Categories */}
      <div className="max-w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-center dark:bg-meta-4">
              <th className="min-w-[30px] px-1 py-4 text-sm text-black dark:text-white">No.</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Category Name</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Status</th>
              <th className="min-w-[100px] px-5 py-4 text-sm text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories?.map((item, rowIndex) => (
              <tr key={item.id} className="border-b border-[#eee] dark:border-strokedark">
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{rowIndex + 1}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.category_name}</span>
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
                      onClick={() => handleViewCategory(item.id)}
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

        {filteredCategories?.length === 0 && (
          <div className="py-4 text-center text-gray-500">
            No categories found for "{searchQuery}"
          </div>
        )}
      </div>



      {/* Add Categories Modal */}
      <AddCategoryModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Edit Categories Modal */}
      {categoryToEdit && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          category={categoryToEdit}
        />
      )}

      {/* Delete Category Modal */}
      {categoryToDelete && (
        <DeleteCategoryModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          category={categoryToDelete}
        />
      )}
    </div>
  );
};

export default CategoriesComponent;
