import React from "react";

interface ShippingInfoFormProps {
  form: {
    address: string;
    city: string;
    altPhone: string;
    note: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ShippingInfoForm: React.FC<ShippingInfoFormProps> = ({ form, handleInputChange }) => {
  return (
    <div className="mb-4 pl-15 pr-15">
      <h3 className="font-medium text-sm mb-2 text-black-2">Shipping Info</h3>
      <input
        type="text"
        name="address"
        placeholder="Detailed Address"
        value={form.address}
        onChange={handleInputChange}
        className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full mb-2"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <select
          name="city"
          value={form.city}
          onChange={handleInputChange}
          className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
        >
          <option value="">Select Location</option>
          <option value="Inside Dhaka">Inside Dhaka</option>
          <option value="Outside Dhaka">Outside Dhaka</option>
        </select>
        <input
          type="tel"
          name="altPhone"
          placeholder="Alt. Phone (01XXXXXXXXX)"
          value={form.altPhone}
          onChange={handleInputChange}
          className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full"
        />
      </div>
      <textarea
        name="note"
        placeholder="Special instructions for delivery"
        value={form.note}
        onChange={handleInputChange}
        className="border border-[#C8C8C8] bg-gray-100 rounded p-2 text-sm w-full mt-2"
      />
    </div>
  );
};

export default ShippingInfoForm;
