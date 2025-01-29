
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


export const metadata: Metadata = {
  title:
    "Msmart",
  description: "Msmart Admin Panel",
};

export default function Home() {
  return (
    <>
    
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    
    </>
  );
}
