
import ViewSubcategory from "@/components/Core/Core-Subcategories/ViewSubcategory";

const SubcategoryPage = ({ params }: { params: { id: string } }) => {
  return <ViewSubcategory params={params} />;
};

export default SubcategoryPage;