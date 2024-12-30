// pages/auth/verify-otp.tsx
import React from "react";
import dynamic from 'next/dynamic';
import "react-toastify/dist/ReactToastify.css";
// import VerifyOtpPage from "@/components/forms/Verify-OTP";

const VerifyOtpPage = dynamic(() => import('@/components/forms/Verify-OTP'), {
  ssr: false
});

const Verify: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark w-full max-w-md">
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            OTP Verification
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Enter the 6-digit code sent to your email to verify your account.
          </p>
          <VerifyOtpPage />
        </div>
      </div>
    </div>
  );
};

export default Verify;
