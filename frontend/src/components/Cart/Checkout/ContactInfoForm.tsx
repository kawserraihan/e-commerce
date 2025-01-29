import React from "react";

interface ContactInfoFormProps {
  form: {
    fullName: string;
    email: string;
    phone: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ form, handleInputChange }) => {
  return (
    <div className="mb-6 pl-15 pr-15 pt-10">
    <h2 className="text-xl font-bold mb-4 text-black-2 text-center">Checkout Info</h2>
      <h3 className="font-medium text-sm mb-2 text-black-2">Contact Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleInputChange}
          className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
          className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleInputChange}
          className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
        />
      </div>
    </div>
  );
};

export default ContactInfoForm;
