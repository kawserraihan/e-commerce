// components/forms/VerifyOTP.tsx
"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useVerifyOtpMutation } from "../../../redux/features/authApiSlice";
import { toast } from "react-toastify";

const VerifyOTP: React.FC = () => {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpId, setOtpId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  useEffect(() => {
    if (router.isReady) {
      const otp_id = router.query.otp_id as string;
      const email = router.query.email as string;
      if (otp_id) setOtpId(Number(otp_id));
      if (email) setEmail(email);
    }
  }, [router.isReady, router.query]);

  const handleInputChange = (index: number, value: string) => {
    const newOtpCode = [...otpCode];
    newOtpCode[index] = value;
    setOtpCode(newOtpCode);

    // Focus next input on input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpCode.join("");
    if (!otpId || fullOtp.length !== 6 || !email) {
      toast.warning("Please ensure all fields are correctly filled.");
      return;
    }

    try {
      await verifyOtp({ otp_id: otpId, otp_code: fullOtp, email }).unwrap();
      toast.success("OTP verification successful");
      router.push("/dashboard"); // Adjust the redirect path as needed
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
            style={{ width: "45px", marginRight: "10px", textAlign: "center" }}
            autoComplete="one-time-code"
          />
        ))}
      </div>
      <button type="submit" disabled={isLoading}>Verify OTP</button>
    </form>
  );
};

export default VerifyOTP;
