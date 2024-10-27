
'use client'; // Ensure this is the first line in your file

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetCategoryByIdQuery } from "../../../../redux/features/authApiSlice";

// Receiving `params` as a prop in App Router (Next.js 13)
const ViewCategory = ({ params }: { params: { id: string } }) => {
  const categoryId = parseInt(params.id, 10);

  // Call the query only if categoryId is valid
  const { data: category, isLoading, isError } = useGetCategoryByIdQuery(categoryId, {
    skip: isNaN(categoryId), // Skip the query if categoryId is not valid
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !category) return <div>Error fetching category data.</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Category Details</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold">Category Name</h2>
          <p>{category.category_name}</p>

          {/* Additional fields */}
          <h2 className="text-xl font-semibold mt-4">Status</h2>
          <p>{category.is_active ? 'Active' : 'Inactive'}</p>
          <h2 className="text-xl font-semibold mt-4">Created At</h2>
          <p>{new Date(category.created_at).toLocaleString()}</p>
          <h2 className="text-xl font-semibold mt-4">Modified At</h2>
          <p>{new Date(category.modified_at).toLocaleString()}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewCategory;
