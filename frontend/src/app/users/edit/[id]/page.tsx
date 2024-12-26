'use client'
import React, { useEffect, useState } from 'react'

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditUserModal = ({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: any }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updated User Data:', formData);
        // Call your API to update user data
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 lg:pt-20">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-lg font-semibold ">Edit User</h2>
                    <button onClick={onClose} className=" text-blue-500 hover:underline">
                        Close
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label htmlFor="productCode" className="text-sm font-medium">First Name</label>
                    <input
                        type="text"
                        name='first_name'
                        // value={productCode} 
                        // onChange={onChange}
                        placeholder="Enter First Name"
                        required
                        className="border border-[#B1C7E5] rounded-md p-2" />

                    <label htmlFor="productCode" className="text-sm font-medium">Last Name</label>
                    <input
                        type="text"
                        name='last_name'
                        // value={productCode} 
                        // onChange={onChange}
                        placeholder="Enter Last Name"
                        required
                        className="border border-[#B1C7E5] rounded-md p-2" />


                    <label htmlFor="productCode" className="text-sm font-medium">Email Address</label>
                    <input
                        type="text"
                        name='email'
                        // value={productCode} 
                        // onChange={onChange}
                        placeholder="Enter Email Address"
                        required
                        className="border border-[#B1C7E5] rounded-md p-2" />


                    <label htmlFor="productCode" className="text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name='password'
                        // value={productCode} 
                        // onChange={onChange}
                        placeholder="Password"
                        required
                        className="border border-[#B1C7E5] rounded-md p-2" />

                    <label htmlFor="productCode" className="text-sm font-medium">Confirm Password</label>
                    <input
                        type="password"
                        name='re_password'
                        // value={productCode} 
                        // onChange={onChange}
                        placeholder="Confirm Password"
                        required
                        className="border border-[#B1C7E5] rounded-md p-2" />

                    <button type="submit" className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3" style={{ backgroundColor: '#67c5c3' }}
                    //  disabled={isLoading}
                    >
                        Add new User
                        {/* {isLoading ? 'Adding...' : 'Add Product'} */}
                    </button>
                </form>

            </div>
        </div>
    )
}

export default EditUserModal