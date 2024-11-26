'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCouponsQuery } from '../../../../redux/features/authApiSlice';
import ToggleButton from '@/components/FormElements/ToggleButton';
import AddCouponModal from './AddCouponModal';
import EditCouponModal from './EditCouponModal';
import DeleteCouponModal from './DeleteCouponModal';


interface Coupon {
	id: number;
	coupon: number;
  commision: number;
  minumum_amount: number;
  is_active : boolean;
  created_at : string;
  expiry_at : string | null;
  modified_at : string;

}

const CouponsComponent = () => {
  const router = useRouter();

  // Pagination state
  const [page, setPage] = useState<number>(1); // Current page
  const [pageSize] = useState<number>(10); // Page size

  // Fetch Coupon from Redux slice
  const { data, isLoading, error } = useGetCouponsQuery({ page, page_size: pageSize });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [couponToEdit, setCouponToEdit] = useState<Coupon | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal Handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (coupon: Coupon) => {
    setCouponToEdit(coupon);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCouponToEdit(null);
  };

  const openDeleteModal = (coupon: Coupon) => {
    setCouponToDelete(coupon);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCouponToDelete(null);
  };


  if (isLoading) return <p>Loading coupons...</p>;
  if (error) return <p>Error loading coupons.</p>;

  // Filter coupons based on search query
  // Filter coupons based on search query
  const filteredCoupons = data?.results?.filter((coupon: Coupon) =>
    String(coupon.coupon).includes(searchQuery)
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
          placeholder="Search Coupons"
          className="px-4 py-2 border rounded-md text-sm focus:ring focus:ring-primary"
        />
      </div>

      {/* Table displaying filtered Coupons */}
      <div className="max-w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-center dark:bg-meta-4">
              <th className="min-w-[30px] px-1 py-4 text-sm text-black dark:text-white">No.</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Coupons</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Commision</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Minimum Ammount</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Expiry Date</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Status</th>
              <th className="min-w-[100px] px-5 py-4 text-sm text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons?.map((item, rowIndex) => (
              <tr key={item.id} className="border-b border-[#eee] dark:border-strokedark">
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{rowIndex + 1}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.coupon}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.commision}%</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.minumum_amount}৳</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">
                    {item.expiry_at ? new Date(item.expiry_at).toLocaleString() : 'N/A'}
                  </span>
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

        {filteredCoupons?.length === 0 && (
          <div className="py-4 text-center text-gray-500">
            No coupon found for "{searchQuery}"
          </div>
        )}
      </div>



      {/* Add Coupons Modal */}
      <AddCouponModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Edit Coupon Modal */}
      {couponToEdit && (
        <EditCouponModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          coupon={couponToEdit}
        />
      )}

      {/* Delete Coupon Modal */}
      {couponToDelete && (
        <DeleteCouponModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          coupon={couponToDelete}
        />
      )}
    </div>
  );
};

export default CouponsComponent;
