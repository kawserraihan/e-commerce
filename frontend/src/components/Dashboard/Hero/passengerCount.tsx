import React from 'react';
// import { Menu, MenuButton, MenuItems } from "@headlessui/react";
// import { RiArrowDownSLine } from "@remixicon/react";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function PassengerCount({
  update: updateCallback,
  defaultPassengers,
}: {
  update: (passengers: { adults: number; children: number; infants: number }) => void;
  defaultPassengers?: { adults: number; children: number; infants: number };
}) {
  // ... rest of the code
}
