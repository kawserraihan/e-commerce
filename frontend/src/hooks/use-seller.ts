"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCreateSellerProfileMutation } from "../../redux/features/authApiSlice"; // Adjust the import based on your API slice
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useSeller() {
  const router = useRouter();

  const [createSeller, { isLoading }] = useCreateSellerProfileMutation();

  const [formData, setFormData] = useState({
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

  const {
    nid_no,
    nid_front_image,
    nid_back_image,
    trade_license,
    trade_license_image,
    store_name,
    store_logo,
    store_email,
    store_phone,
  } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData();
    form.append("nid_no", nid_no);
    if (nid_front_image) form.append("nid_front_image", nid_front_image);
    if (nid_back_image) form.append("nid_back_image", nid_back_image);
    form.append("trade_license", trade_license);
    if (trade_license_image) form.append("trade_license_image", trade_license_image);
    form.append("store_name", store_name);
    if (store_logo) form.append("store_logo", store_logo);
    form.append("store_email", store_email);
    form.append("store_phone", store_phone);

    try {
      await createSeller(form).unwrap();
      toast.success("Seller profile created successfully");
      router.push("/auth/seller/dashboard"); // Adjust the redirect URL as needed
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`Failed to create seller profile: ${error.data.message}`);
      } else {
        toast.error("Failed to create seller profile: An unknown error occurred");
      }
    }
  };

  return {
    nid_no,
    nid_front_image,
    nid_back_image,
    trade_license,
    trade_license_image,
    store_name,
    store_logo,
    store_email,
    store_phone,
    isLoading,
    onChange,
    onSubmit,
  };
}
