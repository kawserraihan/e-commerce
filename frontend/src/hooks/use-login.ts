"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/authApiSlice";
import { setAuth } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface LoginFormProps {
  onSuccess?: (accessToken: string, userEmail: string) => void;
}

export default function useLogin(onSuccess?: LoginFormProps["onSuccess"]) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({ email, password })
      .unwrap()
      .then(({ access, refresh, email }) => {
        // Save tokens in cookies
        Cookies.set("accessToken", access, {
          secure: true,
          sameSite: "Strict",
          expires: 7,
        });
        Cookies.set("refreshToken", refresh, {
          secure: true,
          sameSite: "Strict",
          expires: 7,
        });

        // Dispatch the setAuth action with tokens
        dispatch(setAuth({ accessToken: access, refreshToken: refresh }));

        // Trigger onSuccess callback
        if (onSuccess) {
          onSuccess(access, email);
        }

        toast.success("Log In Successful");
        router.push("/dashboard");
      })
      .catch(() => {
        toast.error("Failed to log in");
      });
  };

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
