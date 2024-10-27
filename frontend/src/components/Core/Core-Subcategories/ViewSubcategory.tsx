
'use client'; // Ensure this is the first line in your file

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetSubcategoryByIdQuery } from "../../../../redux/features/authApiSlice";

// Receiving `params` as a prop in App Router (Next.js 13)
const ViewSubcategory = ({ params }: { params: { id: string } }) => {
  const subcategoryId = parseInt(params.id, 10);

  // Call the query only if subcategoryId is valid
  const { data: subcategory, isLoading, isError } = useGetSubcategoryByIdQuery(subcategoryId, {
    skip: isNaN(subcategoryId), // Skip the query if subcategoryId is not valid
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !subcategory) return <div>Error fetching subcategory data.</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">SubCategory Details</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold">SubCategory Name</h2>
          <p>{subcategory.subcategory_name}</p>

          {/* Additional fields */}
          <h2 className="text-xl font-semibold mt-4">Category</h2>
          <p>{subcategory.category_name}</p>

          <h2 className="text-xl font-semibold mt-4">Status</h2>
          <p>{subcategory.is_active ? 'Active' : 'Inactive'}</p>
          <h2 className="text-xl font-semibold mt-4">Created At</h2>
          <p>{new Date(subcategory.created_at).toLocaleString()}</p>
          <h2 className="text-xl font-semibold mt-4">Modified At</h2>
          <p>{new Date(subcategory.modified_at).toLocaleString()}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewSubcategory;
