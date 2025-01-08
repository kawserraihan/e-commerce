'use client'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Link from 'next/link'
import React, { useState } from 'react'
import { useGetUsersQuery } from '../../../redux/features/authApiSlice';
import AddUserModal from './add/page';
import EditUser from './edit/[id]/page';
import EditUserModal from './edit/[id]/page';

const Users = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  const { data, isLoading, error } = useGetUsersQuery({ page, page_size: pageSize });
  const users = data?.results;
  console.log(users, "user data");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  return (
    <DefaultLayout>
      <div className="flex justify-between items-center pb-4">
        <button
          onClick={openModal}
          style={{ backgroundColor: '#67c5c3' }}
          className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3"
        >
          Add New
        </button>
      </div>
      {/* Table displaying filtered products */}
      <div className="max-w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* Tabs for filtering */}
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-center dark:bg-meta-4">
              <th className="min-w-[30px] px-1 py-4 text-sm text-black dark:text-white">No.</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">First Name</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Last Name</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Email</th>
              <th className="min-w-[100px] px-5 py-4 text-sm text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, rowIndex) => (
              <tr key={item.id} className="border-b border-[#eee] dark:border-strokedark">
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{rowIndex + 1}</span>
                </td>

                <td className="border-b border-[#eee] px-0 py-5 pl-9 dark:border-strokedark text-center xl:pl-0">
                  <h5 className="text-sm text-black dark:text-white">
                    {item.first_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-0 py-5 pl-9 dark:border-strokedark text-center xl:pl-0">
                  <h5 className="text-sm text-black dark:text-white">
                    {item.last_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-0 py-5 pl-9 dark:border-strokedark text-center xl:pl-0">
                  <h5 className="text-sm text-black dark:text-white">
                    {item.email}
                  </h5>
                </td>
                <td className="px-3 py-5 text-center">
                  <div className='space-x-3'>
                    <Link href={`/users/${item.id}`}>
                      <button className="text-blue-500 hover:underline">View</button>
                    </Link>
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      className="text-red hover:underline"
                    //   onClick={() => openDeleteModal(item)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}

      </div>
      {/* {isModalOpen && <AddUserModal isOpen={isModalOpen} onClose={closeModal} />}
      {isEditModalOpen && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          user={selectedUser}
        />
      )} */}

    </DefaultLayout>
  )
}

export default Users