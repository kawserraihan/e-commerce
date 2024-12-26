// Button Component
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  size = "md",
  className = "",
  disabled = false,
  children,
  onClick,
}) => {
  const baseStyles = "px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizeStyles = size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-md";
  const disabledStyles = disabled
    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
    : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles} ${disabledStyles} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;