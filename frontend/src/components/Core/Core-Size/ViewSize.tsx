
'use client'; // Ensure this is the first line in your file

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetSizeByIdQuery } from "../../../../redux/features/authApiSlice";

// Receiving `params` as a prop in App Router (Next.js 13)
const ViewSize = ({ params }: { params: { id: string } }) => {
  const sizeId = parseInt(params.id, 10);

  // Call the query only if Childcategory ID is valid
  const { data: size, isLoading, isError } = useGetSizeByIdQuery(sizeId, {
    skip: isNaN(sizeId), // Skip the query if sizeId is not valid
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !size) return <div>Error fetching size data.</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Size Details</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold">Size Name</h2>
          <p>{size.size_name}</p>

          <h2 className="text-xl font-semibold">Category Name</h2>
          <p>{size.category_name}</p>

          <h2 className="text-xl font-semibold">SubCategory Name</h2>
          <p>{size.subcategory_name}</p>

          <h2 className="text-xl font-semibold">ChildCategory Name</h2>
          <p>{size.childcategory_name}</p>

          {/* Additional fields */}
          <h2 className="text-xl font-semibold mt-4">Status</h2>
          <p>{size.is_active ? 'Active' : 'Inactive'}</p>
          <h2 className="text-xl font-semibold mt-4">Created At</h2>
          <p>{new Date(size.created_at).toLocaleString()}</p>
          <h2 className="text-xl font-semibold mt-4">Modified At</h2>
          <p>{new Date(size.modified_at).toLocaleString()}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewSize;
