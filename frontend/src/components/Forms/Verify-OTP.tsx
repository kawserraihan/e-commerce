"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyOtpMutation } from "../../../redux/features/authApiSlice";
import { toast } from "react-toastify";

const VerifyOTP: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otpCode, setOtpCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpId, setOtpId] = useState<number | null>(null);
  const [phone, setPhone] = useState<string>("");

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  useEffect(() => {
    // Extract query params using `useSearchParams`
    const otp_id = searchParams.get("otp_id");
    const phone = searchParams.get("phone");

    if (!otp_id || !phone) {
      toast.error("Invalid access. Missing required query parameters.");
      router.push("/error"); // Redirect to an error page if parameters are missing
    } else {
      setOtpId(Number(otp_id));
      setPhone(phone);
    }
  }, [searchParams, router]);

  const handleInputChange = (index: number, value: string) => {
    const newOtpCode = [...otpCode];
    newOtpCode[index] = value;
    setOtpCode(newOtpCode);

    // Automatically move to the next input field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpCode.join("");
    if (!otpId || fullOtp.length !== 6 || !phone) {
      toast.warning("Please ensure all fields are correctly filled.");
      return;
    }

    try {
      await verifyOtp({ otp_id: otpId, otp_code: fullOtp, phone }).unwrap();
      toast.success("OTP verification successful");
      router.push("/auth/login"); // Adjust the redirect path as needed
    } catch (error) {
      toast.error("Error verifying OTP");
    }
  };

  return (
    <form onSubmit={handleOtpSubmit}>
      <div>
        {otpCode.map((code, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={code}
            onChange={(e) => handleInputChange(index, e.target.value)}
            style={{
              width: "45px",
              marginRight: "10px",
              textAlign: "center",
            }}
            autoComplete="one-time-code"
          />
        ))}
      </div>
      <button type="submit" disabled={isLoading}>
        Verify OTP
      </button>
    </form>
  );
};

export default VerifyOTP;
