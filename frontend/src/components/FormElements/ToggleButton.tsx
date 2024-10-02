"use client";
import React, { useState } from "react";

const Toggle: React.FC = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div
        className={`relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary transition-all 
        shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,_rgba(60,64,67,0.15)_0px_1px_3px_1px]`}
      >
        <div
          className={`after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
          ${isChecked ? "after:translate-x-full rtl:after:-translate-x-full after:border-white" : ""}`}
        ></div>
      </div>
    </label>
  );
};

export default Toggle;
