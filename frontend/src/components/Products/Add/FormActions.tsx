import React from "react";

interface FormActionsProps {
  isLoading: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ isLoading }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="bg-[#67c5c3] text-white font-bold py-2 px-6 rounded-md shadow-md hover:bg-[#56b3b0]"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
};

export default FormActions;
