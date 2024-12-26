'use client'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import { useGetUserByIdQuery } from '../../../../redux/features/authApiSlice';

const UserDetails = ({ params }: { params: { id: number } }) => {
  const { data: user } = useGetUserByIdQuery(params?.id);

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold">User Name</h2>
          <p>{user?.first_name} {user?.last_name} </p>
          <h2 className="text-xl font-semibold mt-4">Email</h2>
          <p>{user?.email}</p>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default UserDetails