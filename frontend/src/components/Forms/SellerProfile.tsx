"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

// Interfaces
interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; // Optional prop
  className?: string; // Optional additional className
}

interface FileInputFieldProps {
  label: string; // Label for the input
  name: string; // Name attribute of the input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change event handler
}

type FormDataType = {
  [key: string]: string | File | null;
  nid_no: string;
  nid_front_image: File | null;
  nid_back_image: File | null;
  trade_license: string;
  trade_license_image: File | null;
  store_name: string;
  store_logo: File | null;
  store_email: string;
  store_phone: string;
};

export default function SellerProfileForm() {
  const [formData, setFormData] = useState<FormDataType>({
    nid_no: "",
    nid_front_image: null,
    nid_back_image: null,
    trade_license: "",
    trade_license_image: null,
    store_name: "",
    store_logo: null,
    store_email: "",
    store_phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiURL = process.env.NEXT_PUBLIC_HOST;

  // Extract user ID from the URL query params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const user = searchParams.get("user");
    setUserId(user);
  }, []);

  if (!userId) {
    return <div>Error: User ID is required.</div>;
  }

  // Handle input change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare form data as FormData object
    const data = new FormData();

    // Append each field and file to FormData
    for (const key in formData) {
      const value = formData[key];
      if (value instanceof File) {
        data.append(key, value, value.name); // Append file with its name
      } else if (value !== null) {
        data.append(key, value); // Append non-null string values
      }
    }

    // Add user ID
    data.append("user", userId || ""); // Append the user ID as a string

    try {
      const response = await axios.post(
       `${apiURL}/api/sellers/`, // Replace with your actual API endpoint
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Correct content type
          },
        }
      );
      // Show success toast
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        window.location.href = `${baseUrl}/auth/login`; // Redirect to login page
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <InputField
        label="NID Number"
        type="text"
        name="nid_no"
        value={formData.nid_no}
        onChange={onChange}
        placeholder="NID Number"
      />

      <FileInputField
        label="NID Front Image"
        name="nid_front_image"
        onChange={onChange}
      />

      <FileInputField
        label="NID Back Image"
        name="nid_back_image"
        onChange={onChange}
      />

      <InputField
        label="Trade License"
        type="text"
        name="trade_license"
        value={formData.trade_license}
        onChange={onChange}
        placeholder="Trade License"
      />

      <FileInputField
        label="Trade License Image"
        name="trade_license_image"
        onChange={onChange}
      />

      <InputField
        label="Store Name"
        type="text"
        name="store_name"
        value={formData.store_name}
        onChange={onChange}
        placeholder="Store Name"
      />

      <FileInputField
        label="Store Logo"
        name="store_logo"
        onChange={onChange}
      />

      <InputField
        label="Store Phone"
        type="text"
        name="store_phone"
        value={formData.store_phone}
        onChange={onChange}
        placeholder="Store Phone"
      />

      <InputField
        label="Store Email"
        type="email"
        name="store_email"
        value={formData.store_email}
        onChange={onChange}
        placeholder="Store Email"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full justify-center rounded-md bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

function InputField({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold leading-6 text-gray-900 text-start">
        {label}
      </label>
      <input
        className={`block w-full border-b border-0 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
          className || ""
        }`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function FileInputField({ label, name, onChange }: FileInputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold leading-6 text-gray-900 text-start">
        {label}
      </label>
      <input
        className="p-1 ps-0 w-full text-slate-500 text-sm leading-6 file:bg-violet-200 file:text-violet-700 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 file:rounded-full hover:file:bg-violet-100 border-b"
        type="file"
        name={name}
        onChange={onChange}
      />
    </div>
  );
}
