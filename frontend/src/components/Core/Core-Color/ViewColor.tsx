
'use client'; // Ensure this is the first line in your file

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetColorByIdQuery } from "../../../../redux/features/authApiSlice";

// Receiving `params` as a prop in App Router (Next.js 13)
const ViewColor = ({ params }: { params: { id: string } }) => {
  const colorId = parseInt(params.id, 10);

  // Call the query only if colorId is valid
  const { data: color, isLoading, isError } = useGetColorByIdQuery(colorId, {
    skip: isNaN(colorId), // Skip the query if colorId is not valid
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !color) return <div>Error fetching color data.</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Color Details</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold">Color Name</h2>
          <p>{color.color_name}</p>

          {/* Additional fields */}
          <h2 className="text-xl font-semibold mt-4">Status</h2>
          <p>{color.is_active ? 'Active' : 'Inactive'}</p>
          <h2 className="text-xl font-semibold mt-4">Created At</h2>
          <p>{new Date(color.created_at).toLocaleString()}</p>
          <h2 className="text-xl font-semibold mt-4">Modified At</h2>
          <p>{new Date(color.modified_at).toLocaleString()}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewColor;
