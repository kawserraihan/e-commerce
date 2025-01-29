import Checkout from '../../../components/Cart/Checkout/Checkout';
import Navbar from "@/components/Dashboard/NavBar/Navbar";
import Footer from "@/components/Dashboard/Footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Msmart - Your Cart",
    description:
      "MS- Mart - Cart",
  };



export default async function CartPage() {
  

    return (
        <div>
            <Navbar/>
            {/* Pass cart items to the client-side component */}
            <Checkout/>
            <Footer/>
        </div>
    );
}
