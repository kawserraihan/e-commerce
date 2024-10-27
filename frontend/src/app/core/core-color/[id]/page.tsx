
import ViewColor from "@/components/Core/Core-Color/ViewColor";

const ColorPage = ({ params }: { params: { id: string } }) => {
  return <ViewColor params={params} />;
};

export default ColorPage;