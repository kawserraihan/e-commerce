
'use client'; // Ensure this is the first line in your file

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetChildcategoryByIdQuery } from "../../../../redux/features/authApiSlice";

// Receiving `params` as a prop in App Router (Next.js 13)
const ViewChildcategory = ({ params }: { params: { id: string } }) => {
  const childcategoryId = parseInt(params.id, 10);

  // Call the query only if Childcategory ID is valid
  const { data: childcategory, isLoading, isError } = useGetChildcategoryByIdQuery(childcategoryId, {
    skip: isNaN(childcategoryId), // Skip the query if childcategoryId is not valid
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !childcategory) return <div>Error fetching childcategory data.</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">ChildCategory Details</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold">ChildCategory Name</h2>
          <p>{childcategory.childcategory_name}</p>

          <h2 className="text-xl font-semibold">Category Name</h2>
          <p>{childcategory.category_name}</p>

          <h2 className="text-xl font-semibold">SubCategory Name</h2>
          <p>{childcategory.subcategory_name}</p>

          {/* Additional fields */}
          <h2 className="text-xl font-semibold mt-4">Status</h2>
          <p>{childcategory.is_active ? 'Active' : 'Inactive'}</p>
          <h2 className="text-xl font-semibold mt-4">Created At</h2>
          <p>{new Date(childcategory.created_at).toLocaleString()}</p>
          <h2 className="text-xl font-semibold mt-4">Modified At</h2>
          <p>{new Date(childcategory.modified_at).toLocaleString()}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewChildcategory;
