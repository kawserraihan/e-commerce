import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
  <Breadcrumb pageName="Profile" />

  <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="relative z-20 h-35 md:h-65">
      <Image
        src={"/images/cover/cover-01.png"}
        alt="profile cover"
        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
        width={970}
        height={260}
        style={{
          width: "auto",
          height: "auto",
        }}
      />
      <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4 text-center">
        <label
          htmlFor="cover"
          className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
        >
          <input type="file" name="cover" id="cover" className="sr-only" />

          <span>Edit</span>
        </label>
      </div>
    </div>

    {/* Profile Picture Section */}
    <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
      <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
        <div className="relative drop-shadow-2">
          <Image
            src={"/images/user/user-06.png"}
            width={160}
            height={160}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="profile"
          />
          <label
            htmlFor="profile"
            className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
          >
            {/* SVG path code */}
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#f8fafc"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            <input type="file" name="profile" id="profile" className="sr-only" />
          </label>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-4">
        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
          Imamul Hasan Rana
        </h3>
        <p className="font-medium mb-6">Buyer</p>

        {/* User Details Section */}
        <div className="mx-auto mb-5.5 max-w-full md:max-w-94 rounded-md border border-stroke py-6 px-8 shadow-lg dark:border-strokedark dark:bg-[#37404F]">
  {/* Section Caption */}
  <h4 className="mb-6 text-lg font-semibold text-black dark:text-white">
    Personal Information
  </h4>

  {/* User Info */}
  <div className="space-y-5">
    <div className="flex justify-between">
      <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
      <span className="font-semibold text-black dark:text-white">Imamul Hasan Rana</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium text-gray-700 dark:text-gray-300">Number:</span>
      <span className="font-semibold text-black dark:text-white">+880123456789</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
      <span className="font-semibold text-black dark:text-white">fahim@example.com</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium text-gray-700 dark:text-gray-300">Address:</span>
      <span className="font-semibold text-black dark:text-white">Dhaka, Bangladesh</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium text-gray-700 dark:text-gray-300">NID:</span>
      <span className="font-semibold text-black dark:text-white">1234567890</span>
    </div>
  </div>
</div>


        {/* Profile Completion Progress */}
        <div className="mx-auto max-w-180 mt-6">
          <h4 className="font-semibold text-black dark:text-white mb-2">Profile Completion</h4>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: "75%" }}></div>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">75% complete</p>
        </div>
      </div>
    </div>
  </div>
</div>
    </DefaultLayout>
  );
};

export default Profile;
