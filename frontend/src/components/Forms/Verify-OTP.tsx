"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useVerifyOtpMutation } from "../../../redux/features/authApiSlice";
import { toast } from "react-toastify";

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otpCode, setOtpCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpId, setOtpId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  useEffect(() => {
    const otp_id = searchParams.get("otp_id");
    const email = searchParams.get("email");
    if (otp_id) setOtpId(Number(otp_id));
    if (email) setEmail(email);
  }, [searchParams]);

  // Handle OTP Input Changes
  const handleInputChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Only allow numbers
    const newOtpCode = [...otpCode];
    newOtpCode[index] = value.slice(-1); // Limit to one character
    setOtpCode(newOtpCode);

    // Move focus to the next input box
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpCode.join(""); // Combine all OTP inputs

    if (!otpId || fullOtp.length !== 6 || !email) {
      toast.warning("Please fill in the OTP correctly and ensure email is valid");
      return;
    }

    try {
      const response = await verifyOtp({
        otp_id: otpId,
        otp_code: fullOtp,
        email,
      }).unwrap();

      toast.success("OTP verification successful");
      router.push("/auth/login");
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error("Error verifying OTP");
    }
  };

  return (
    <div className="otp-container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Verify</h1>
      <p>Your code was sent to you via email</p>
      <form onSubmit={handleOtpSubmit}>
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
          {otpCode.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={{
                width: "40px",
                height: "50px",
                textAlign: "center",
                fontSize: "1.5rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
              }}
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Verify
        </button>
      </form>
      <p style={{ marginTop: "15px" }}>
        Didn't receive code? <a href="#" style={{ color: "#007bff" }}>Request again</a>
      </p>
    </div>
  );
};

export default VerifyOtpPage;
