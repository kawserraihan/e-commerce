import CashInvoice from "@/components/Payment/CashInvoice";
import Navbar from "@/components/Dashboard/NavBar/Navbar";
import Footer from "@/components/Dashboard/Footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Msmart - Cash Invoice",
  description: "MS-Mart - Invoice for Cash Payment",
};

// Define the type for PageProps
interface PageProps {
  params: {
    orderId: string;
  };
}

export default function CashInvoicePage({ params }: PageProps) {
  return (
    <div>
      <Navbar />
      {/* Pass the orderId prop directly */}
      <CashInvoice orderId={params.orderId} />
      <Footer />
    </div>
  );
}
