"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "../../redux/features/authApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure this is imported

export default function useRegister() { 
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await register({ first_name, last_name, email, password, re_password }).unwrap();
      toast.success("Registration successful");
      router.push("/auth/login");
      
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`Registration failed: ${error.data.message}`);
      } else {
        toast.error("Registration failed: An unknown error occurred");
      }
    }
  };
  

  return {
    first_name,
    last_name,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  };
}

// In your layout or page component, remember to include:
