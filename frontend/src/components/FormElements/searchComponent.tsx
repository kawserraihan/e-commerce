"use client";
import { useState } from "react";


const SearchComponent = () => {
  const [isFocused, setIsFocused] = useState(false);



  return (
    <div className="relative w-full max-w-xs border border-stroke dark:border-strokedark rounded-md flex">
      <input
        type="text"
        placeholder="Type to search..."
        className={`w-full border-none px-3 py-2 pr-12 text-sm rounded-l-md focus:outline-none ${
          isFocused ? 'ring-1 ring-blue-200' : ''
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {/* Clickable Icon Button with custom hover effect */}
      <button
        type="button"
        className="flex items-center justify-center px-3 bg-gray-200 dark:bg-gray-700 border-l border-stroke dark:border-strokedark rounded-r-md hover:bg-blue-200 dark:hover:bg-blue-600 active:bg-gray-400 dark:active:bg-gray-500 focus:outline-none"
        onClick={() => console.log("Search button clicked!")}
      >
        <span className="material-icons">search</span>
      </button>
    </div>
  );
};

export default SearchComponent;
