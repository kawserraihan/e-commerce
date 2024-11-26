'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetOrdersQuery } from '../../../redux/features/authApiSlice';
// import DeleteProductModal from './DeleteProductModal';
import ToggleButton from '@/components/FormElements/ToggleButton';
import Link from 'next/link';


interface UserOrder {
	id: number;
	user: number;
	user_name: string;
	user_phone: string;
	payment_status: string;
	amount_paid: number;
	total_amount: number;
	delivery_status: string;
	created_at: string;
}

const UserOrdersComponent = () => {
  const router = useRouter();

  // Pagination state
  const [page, setPage] = useState<number>(1); // Current page
  const [pageSize] = useState<number>(10); // Page size
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [userOrderToDelete, setUserOrderToDelete] = useState<UserOrder | null>(null);

  // Fetch UserOrder from Redux slice
  const { data, isLoading, error } = useGetOrdersQuery({ page, page_size: pageSize });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const openDeleteModal = (order: UserOrder) => {
    setUserOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserOrderToDelete(null);
  };

  // Navigate to view UserOrder details dynamically
  const handleViewUserOrder = (id: number) => {
    router.push(`/orders/${id}`);
  };

  if (isLoading) return <p>Loading Orders...</p>;
  if (error) return <p>Error loading Orders.</p>;

  // Filter UserOrder based on search query
  // ... previous code remains the same

  // Filter UserOrder based on search query
  const filteredUserOrders = data?.results?.filter((order: UserOrder) =>
    String(order.id).includes(searchQuery)
  );

  // ... the rest of the component

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
        {/* <Link href="/orders/add">
          <button
            style={{ backgroundColor: '#67c5c3' }}
            className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3"
          >
            Add New
          </button>
        </Link> */}

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Orders"
          className="px-4 py-2 border rounded-md text-sm focus:ring focus:ring-primary"
        />
      </div>

      {/* Table displaying filtered orders */}
      <div className="max-w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[10px] px-5 py-4 text-sm text-black dark:text-white">
                    No
                </th>
                <th className="min-w-[200px] px-4 py-4 text-sm text-black dark:text-white xl:pl-1">
                    Order No & Order Date
                </th>
                <th className="min-w-[220px] px-4 py-4 text-sm text-black dark:text-white xl:pl-1">
                    Customer Name & Contact No.
                </th>
                <th className="min-w-[150px] px-4 py-4 text-sm text-black dark:text-white xl:pl-0">
                    Payment Method
                </th>
                <th className="min-w-[120px] px-4 py-4 text-sm text-black dark:text-white">
                    Delivery Status
                </th>
                <th className="min-w-[120px] px-4 py-4 text-sm text-black dark:text-white">
                    Payment Amount
                </th>
                <th className="min-w-[120px] px-4 py-4 text-sm text-black dark:text-white">
                    Payment Status & Paid Amount
                </th>
                <th className="px-4 py-4 text-sm text-black dark:text-white">
                    Actions
                </th>
                </tr>
          </thead>
          <tbody>
            {filteredUserOrders?.map((orderItem, rowIndex) => (
              <tr key={orderItem.id} className="border-b border-[#eee] dark:border-strokedark">
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{rowIndex + 1}</span>
                </td>

                <td className="border-b border-[#eee] px-1 py-5 pl-9 dark:border-strokedark xl:pl-2">
                  <h5 className="text-sm text-black dark:text-white">
                    Order No: {orderItem.id}
                  </h5>
                  <p className="text-sm">{new Date(orderItem.created_at).toLocaleString()}</p>
                </td>


                <td className="border-b border-[#eee] px-2 py-5 pl-9 dark:border-strokedark xl:pl-13">
                  <h5 className="text-sm text-black dark:text-white">
                    Name: {orderItem.user_name}
                  </h5>
                  <p className="text-sm">{orderItem.user_phone}</p>
                </td>



                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-8">
                  <p className="text-black dark:text-white">
                    Cash
                  </p>
                </td>


                <td className="border-b border-[#eee] px-5 py-5 dark:border-strokedark font-bold">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm ${
                      orderItem.delivery_status === "delivered"
                        ? "bg-success text-success"
                        : orderItem.delivery_status === "not delivered"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}
                  >
                        {orderItem.delivery_status === "delivered" 
                            ? "Delivered" 
                            : orderItem.delivery_status === "not delivered" 
                                ? "Not Delivered" 
                                : orderItem.delivery_status}
                  </p>
                </td>



                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white px-0">
                    {orderItem.total_amount} ৳
                  </p>
                </td>


                <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-14">
                  <h5 className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm ${
                      orderItem.payment_status === "paid"
                        ? "bg-success text-success"
                        : orderItem.payment_status === "pending"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}>
                        {orderItem.payment_status === "paid" 
                            ? "Paid" 
                            : orderItem.payment_status === "pending" 
                                ? "Pending" 
                                : orderItem.delivery_status === "partial"
                                ? "Partial"
                            :orderItem.payment_status }
                  </h5>
                  <p className="font-bold" style={{ fontSize: '12px' }}>Paid: {orderItem.amount_paid} ৳</p>
                </td>

                <td className="px-3 py-5 text-center">
                  <div className='space-x-3'>
                    <Link href={`/orders/${orderItem.id}`}>
                      <button className="text-blue-500 hover:underline">View</button>
                    </Link>
                  </div>
                </td>





              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
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

        {filteredUserOrders?.length === 0 && (
          <div className="py-4 text-center text-gray-500">
            No User Order found for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Delete User Order Modal */}
      {/* {userOrderToDelete && (
        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          order={userOrderToDelete}
        />
      )} */}
    </div>
  );
};

export default UserOrdersComponent;
   