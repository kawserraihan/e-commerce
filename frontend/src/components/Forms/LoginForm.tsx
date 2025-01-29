"use client";

import { useLogin } from "@/hooks";
import { Form } from "@/components/forms";

interface LoginFormProps {
  onSuccess?: (accessToken: string, userEmail: string) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { email, password, isLoading, onChange, onSubmit } = useLogin(onSuccess);

  const config = [
    {
      labelText: "Email address",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      link: {
        linkText: "Forgot password?",
        linkUrl: "/password-reset",
      },
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Sign in"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
