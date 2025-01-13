"use client";

import React, { useState } from 'react';
import { useRegisterMutation, useSendOtpMutation } from '../../../redux/features/authApiSlice';
import { Form } from '@/components/forms';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks';
import Cookies from 'js-cookie';


export default function RegisterForm() {
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [sendOtp, { isLoading: isOtpLoading }] = useSendOtpMutation();
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);
  const [otpId, setOtpId] = useState<number | null>(null);

  // Destructuring the values from useRegister hook
  const {
    first_name,
    last_name,
    email,
    phone,
    password,
    re_password,
    onChange,
  } = useRegister();

  console.log("Email from useRegister:", email);
  console.log("Phone from useRegister:", phone);
  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  // Handle form submission
  // const handleFormSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (isRegistering || isOtpLoading) return;

  //   try {
  //     // Step 1: Register the user with the correct payload
  //     const simplifiedPayload = {
  //       first_name,
  //       last_name,
  //       email,  // Use the email directly as a string
  //       password,
  //       re_password,
  //     };

  //     // Register the user
  //     const { data: registerData } = await register(simplifiedPayload).unwrap();
  //     console.log('Registration successful:', registerData);

  //     console.log('Email before sending OTP:', email);

  //     // Step 2: After successful registration, log and send OTP
  //     const otpPayload = { email }; // Payload for OTP request
  //     console.log('Payload sent to /register/otp:', otpPayload); // Log the payload

  //     // Send OTP request
  //     const { data: otpData } = await sendOtp(otpPayload);
  //     console.log('OTP sent:', otpData);


  //     // Save OTP ID for later use
  //     setOtpId(otpData.otp_id);

  //     // Redirect to OTP verification page with the OTP ID
  //     router.push(`/auth/verify-otp?otp_id=${otpData.otp_id}&email=${email}`);
  //   } catch (error) {
  //     console.error("Error registering or sending OTP:", error);
  //   }
  // };

const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isRegistering || isOtpLoading) return;

  try {
    // Step 1: Prepare the payload for registration
    const simplifiedPayload = {
      first_name,
      last_name,
      email, // Use the email directly as a string
      phone, // Use the phone number directly as a string
      password,
      re_password,
    };

    // Register the user
    const registerResponse = await register(simplifiedPayload).unwrap();
    console.log('Registration successful:', registerResponse);

    // Ensure the registration response contains the required data
    if (!registerResponse || !registerResponse.id) {
      console.error("Registration failed: Missing user ID in response");
      return;
    }

    const userObject = {
      id: registerResponse.id,
      email: registerResponse.email,
      phone: registerResponse.phone,
      first_name: registerResponse.first_name,
      last_name: registerResponse.last_name,
    };

    // Save user information in the cookie
    Cookies.set("user", JSON.stringify(userObject), {
      expires: 7, // Set cookie expiration to 7 days
    });
    console.log('User information saved in cookie:', userObject);

    console.log('Phone before sending OTP:', phone);

    // Step 2: Send OTP request after successful registration
    const otpPayload = { phone }; // Payload for OTP request
    console.log('Payload sent to /register/otp:', otpPayload);

    const otpResponse = await sendOtp(otpPayload).unwrap();
    console.log('OTP sent successfully:', otpResponse);

    // Save the OTP ID for later use
    if (!otpResponse || !otpResponse.otp_id) {
      console.error("OTP response missing required otp_id");
      return;
    }
    setOtpId(otpResponse.otp_id);

    // Step 3: Redirect to the OTP verification page
    router.push(`/auth/verify-otp?otp_id=${otpResponse.otp_id}&phone=${phone}`);
  } catch (error) {
    console.error("Error during registration or OTP process:", error);
  }
};

  

  const config = [
    { labelText: 'First name', labelId: 'first_name', type: 'text', value: first_name, required: true },
    { labelText: 'Last name', labelId: 'last_name', type: 'text', value: last_name, required: true },
    { labelText: 'Email address', labelId: 'email', type: 'email', value: email, required: true },
    { labelText: 'Phone Number', labelId: 'phone', type: 'phone', value: phone, required: true },
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
      {/* <div className="checkbox-container mr-1">
        <label htmlFor="terms-checkbox">
          <input
            type="checkbox"
            id="terms-checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
            I agree to the <a href="#" style={{ color: "#007bff" }}>Terms and Conditions</a>
        </label>
      </div> */}
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
