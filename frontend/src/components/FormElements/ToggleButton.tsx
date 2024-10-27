// Toggle.tsx
"use client";
import React, { useState, useEffect } from "react";

interface ToggleProps {
  isChecked: boolean; // Prop to determine the initial checked state
  onToggle: (checked: boolean) => void; // Function to handle toggle changes
}

const Toggle: React.FC<ToggleProps> = ({ isChecked, onToggle }) => {
  const [isToggled, setIsToggled] = useState(isChecked); // Initialize state with the prop

  const handleToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);
    onToggle(newToggleState); // Call the function passed as a prop to notify about the change
  };

  // Update local state when prop changes (if needed)
  useEffect(() => {
    setIsToggled(isChecked);
  }, [isChecked]);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isToggled}
        onChange={handleToggle}
      />
      <div
        className={`relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary transition-all 
        shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,_rgba(60,64,67,0.15)_0px_1px_3px_1px]`}
      >
        <div
          className={`after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
          ${isToggled ? "after:translate-x-full rtl:after:-translate-x-full after:border-white" : ""}`}
        ></div>
      </div>
    </label>
  );
};

export default Toggle;
