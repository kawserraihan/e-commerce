'use client'; // Ensure this is the first line in your file


import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetBrandByIdQuery } from "../../../../redux/features/authApiSlice";

// Receiving `params` as a prop in App Router (Next.js 13)
const ViewBrand = ({ params }: { params: { id: string } }) => {
  const brandId = parseInt(params.id, 10);

  // Call the query only if brandId is valid
  const { data: brand, isLoading, isError } = useGetBrandByIdQuery(brandId, {
    skip: isNaN(brandId), // Skip the query if brandId is not valid
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !brand) return <div>Error fetching brand data.</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Brand Details</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold">Brand Name</h2>
          <p>{brand.brand_name}</p>

          {/* Additional fields */}
          <h2 className="text-xl font-semibold mt-4">Status</h2>
          <p>{brand.is_active ? 'Active' : 'Inactive'}</p>
          <h2 className="text-xl font-semibold mt-4">Created At</h2>
          <p>{new Date(brand.created_at).toLocaleString()}</p>
          <h2 className="text-xl font-semibold mt-4">Modified At</h2>
          <p>{new Date(brand.modified_at).toLocaleString()}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewBrand;
