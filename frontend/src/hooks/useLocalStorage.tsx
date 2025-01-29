"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type SetValue<T> = T | ((val: T) => T);

function useCookieStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Retrieve value from cookies
      const cookieValue = Cookies.get(key);
      return cookieValue ? JSON.parse(cookieValue) : initialValue;
    } catch (error) {
      console.error("Error reading cookie:", error);
      return initialValue;
    }
  });

  // useEffect to update cookies when the state changes
  useEffect(() => {
    try {
      const valueToStore =
        typeof storedValue === "function"
          ? storedValue(storedValue)
          : storedValue;

      // Save value to cookies
      Cookies.set(key, JSON.stringify(valueToStore), {
        secure: true,
        sameSite: "Strict",
        expires: 7, // Optional: Cookie expiration in days
      });
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useCookieStorage;
