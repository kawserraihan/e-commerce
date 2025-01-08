"use client";

import React, { useState } from 'react';
import { useRegisterMutation, useUpdateUserRoleMutation } from '../../../redux/features/authApiSlice';
import { Form } from '@/components/forms';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks';
import Cookies from "js-cookie";
import { getUserFromCookie } from '@/hooks/getLoginUser';

export default function RegisterSellerForm() {
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const {
    first_name,
    last_name,
    email,
    password,
    re_password,
    onChange,
  } = useRegister();

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) return;

    try {
      const simplifiedPayload = {
        first_name,
        last_name,
        email, 
        password,
        re_password,
      };

      // Register the user
      const registerResponse = await register(simplifiedPayload).unwrap();
      // navigate('/auth/login')
      console.log('Registration successful:', registerResponse);

      // Check if registerResponse contains expected data
      if (!registerResponse || !registerResponse.id) {
        console.error("Registration failed: Missing user ID in response");
        return;
      }
      const user_id = registerResponse.id;
      console.log("User ID: ", user_id);

      // Step 2: Immediately assign the role after registration
      const role_id = 3;  // Replace with the role you want to assign
      console.log("Assigning Role: ", { user_id, role_id });

      const userObject = {
        id: user_id,
        email: registerResponse.email,
        role_id,
        first_name: registerResponse.first_name,
        last_name: registerResponse.last_name,
      };
      // Send the role update mutation
      await updateUserRole({ user_id, role_id }).unwrap();
      console.log('User role updated');
      Cookies.set("user", JSON.stringify(userObject), {
        expires: 7,
      });
      // Step 3: Redirect to the seller profile page after successful registration
      router.push(`/auth/seller/seller-profile?user=${user_id}`);
    } catch (error) {
      console.error("Error registering or updating role:", error);
    }
  };

  const config = [
    { labelText: 'First name', labelId: 'first_name', type: 'text', value: first_name, required: true },
    { labelText: 'Last name', labelId: 'last_name', type: 'text', value: last_name, required: true },
    { labelText: 'Email address', labelId: 'email', type: 'email', value: email, required: true },
    { labelText: 'Password', labelId: 'password', type: 'password', value: password, required: true },
    { labelText: 'Confirm password', labelId: 're_password', type: 'password', value: re_password, required: true },
  ];

  return (
    <>
      <Form
        config={config}
        isLoading={isRegistering}
        btnText="Sign up"
        onChange={onChange}
        onSubmit={handleFormSubmit}
        disabled={!isChecked}
      />

      {/* Checkbox for terms and conditions */}
      <div className="checkbox-container mr-1 mt-3">
        <label htmlFor="terms-checkbox flex itemx-center">
          <input
            type="checkbox"
            id="terms-checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className='ms-2'> I agree to the <a href="#" style={{ color: "#007bff" }}>Terms and Conditions</a></span>
        </label>
      </div>
    </>
  );
}
