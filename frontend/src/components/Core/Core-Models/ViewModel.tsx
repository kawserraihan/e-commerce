
'use client'; // Ensure this is the first line in your file

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetModelByIdQuery } from "../../../../redux/features/authApiSlice";

// Receiving `params` as a prop in App Router (Next.js 13)
const ViewModel = ({ params }: { params: { id: string } }) => {
  const modelId = parseInt(params.id, 10);

  // Call the query only if model is valid
  const { data: model, isLoading, isError } = useGetModelByIdQuery(modelId, {
    skip: isNaN(modelId), // Skip the query if modelID is not valid
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !model) return <div>Error fetching model data.</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Model Details</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold">Model Name</h2>
          <p>{model.model_name}</p>

          {/* Additional fields */}
          <h2 className="text-xl font-semibold mt-4">Brand</h2>
          <p>{model.brandid}</p>

          <h2 className="text-xl font-semibold mt-4">Status</h2>
          <p>{model.is_active ? 'Active' : 'Inactive'}</p>
          <h2 className="text-xl font-semibold mt-4">Created At</h2>
          <p>{new Date(model.created_at).toLocaleString()}</p>
          <h2 className="text-xl font-semibold mt-4">Modified At</h2>
          <p>{new Date(model.modified_at).toLocaleString()}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewModel;
