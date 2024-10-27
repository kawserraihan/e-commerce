
import ViewCategory from "@/components/Core/Core-Categories/ViewCategory";

const CategoryPage = ({ params }: { params: { id: string } }) => {
  return <ViewCategory params={params} />;
};

export default CategoryPage;