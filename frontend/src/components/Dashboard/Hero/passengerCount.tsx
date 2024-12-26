import React from 'react';
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function PassengerCount({ update, defaultPassengers }) {
  const [passengers, setPassengers] = useState(
    defaultPassengers || {
      adults: 0,
      children: 0,
      infants: 0,
    }
  );
  useEffect(() => {
    if (update) {
      update(passengers);
    }
  }, [passengers]);
  const increment = (type) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };
  const decrement = (type) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(prev[type] - 1, 0), // Corrected to subtract 1
    }));
  };
  // Function to generate the passenger label dynamically
  const getPassengerLabel = () => {
    const labels = [];
    if (passengers.adults > 0) {
      labels.push(
        `${passengers.adults} adult${passengers.adults > 1 ? "s" : ""}`
      );
    }
    if (passengers.children > 0) {
      labels.push(
        `${passengers.children} child${passengers.children > 1 ? "rens" : ""}`
      );
    }
    if (passengers.infants > 0) {
      labels.push(
        `${passengers.infants} infant${passengers.infants > 1 ? "s" : ""}`
      );
    }
    return labels.length > 0 ? labels.join(", ") : "Select passengers";
  };
  return (
    <div className="mb-0">
      <Menu as="div" className="relative block text-left">
        <div>
          <MenuButton className="inline-flex justify-between w-full p-3 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg shadow-xs focus:border-gray-300 h-11 focus:outline-none focus:ring-0">
            {getPassengerLabel()}
            <RiArrowDownSLine className="w-5 h-5 ml-2 text-gray-500" />
          </MenuButton>
        </div>
        <MenuItems className="absolute right-0 z-10 w-full origin-top-right bg-white border border-gray-300 divide-y divide-gray-200 rounded-lg shadow-custom focus:outline-none">
          <div className="py-1">
            {/* Adult Row */}
            <div className="flex items-center justify-between px-4 py-2">
              <span>Adults</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement("adults")}
                  className="px-2 py-1 text-gray-600 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{passengers.adults}</span>
                <button
                  onClick={() => increment("adults")}
                  className="px-2 py-1 text-gray-600 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            {/* Children Row */}
            <div className="flex items-center justify-between px-4 py-2">
              <span>Children</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement("children")}
                  className="px-2 py-1 text-gray-600 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{passengers.children}</span>
                <button
                  onClick={() => increment("children")}
                  className="px-2 py-1 text-gray-600 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            {/* Infants Row */}
            <div className="flex items-center justify-between px-4 py-2">
              <span>Infants</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrement("infants")}
                  className="px-2 py-1 text-gray-600 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{passengers.infants}</span>
                <button
                  onClick={() => increment("infants")}
                  className="px-2 py-1 text-gray-600 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
