'use client'
import ProductsByStore from "@/components/Dashboard/Store/ProductsByStore";
import Navbar from "@/components/Dashboard/NavBar/Navbar";
import Footer from "@/components/Dashboard/Footer/Footer";
import { useGetStoreProductsByIdQuery } from "../../../../redux/features/storeApiSlice";
import { useParams } from "next/navigation";

const StorePage = () => {
  const { id } = useParams()
  console.log(id, "id");

  const { data, error, isLoading } = useGetStoreProductsByIdQuery({
    id: id,
    page: 1,
    page_size: 20
  });
  return (
    <div>
      <Navbar />
      <ProductsByStore data={data?.results} />
      <Footer />
    </div>
  );
};

export default StorePage;
