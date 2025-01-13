import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import Cookies from 'js-cookie'; // Ensure js-cookie is imported
import { useLogoutMutation } from '../../../redux/features/authApiSlice'; // Replace with the correct path to your API slice
import { useRouter } from 'next/navigation';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logout] = useLogoutMutation(); // Hook for the logout mutation
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const router = isClient ? useRouter() : null; // Use useRouter only on the client

  // Ensure this runs only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Retrieve user details from cookies
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const userName = user ? `${user.first_name} ${user.last_name}` : 'Guest';
  const userRole = user && user.roles && user.roles.length > 0 ? user.roles[0].name : 'User';

  const handleLogout = async () => {
    try {
      await logout({}).unwrap(); // Call the logout mutation with an empty object
      Cookies.remove('user'); // Clear user cookies

      // Redirect to login if on the client
      if (router) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {userName}
          </span>
          <span className="block text-xs">{userRole}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/images/user/user3d-04.jpg"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {dropdownOpen && (
        <div className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}>
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-4 dark:border-strokedark">
            <li>
              <Link href="/profile" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                My Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                Account Settings
              </Link>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
