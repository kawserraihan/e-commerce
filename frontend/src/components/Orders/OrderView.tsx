'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetOrderByIdQuery } from '../../../redux/features/authApiSlice';
import Image from "next/image";

interface OrderItem {
  id: number;
  product_name: string;
  product_image: string | null; // Allowing null
  quantity: number;
  price: number;
  total_price: number;
}

interface UserOrder {
  id: number;
  user_name: string;
  user_phone: string;
  amount_paid: number;
  total_amount: number;
  created_at: string;
  items: OrderItem[];
}

const OrdersView = () => {
  const router = useRouter();
  const { id } = useParams();
  const [order, setOrder] = useState<UserOrder | null>(null);

  // Fetch order details from Redux slice using ID from the URL
  const { data, isLoading, error } = useGetOrderByIdQuery(Number(id));

  useEffect(() => {
    if (data) {
      setOrder(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading Order...</p>;
  if (error) return <p>Error loading Order.</p>;


  return (
    <div className="max-w-full p-7 pt-1">
      <div className="max-w-full bg-white shadow-lg rounded-lg p-8 relative">
        <div className="absolute top-4 right-4">
        <button
          onClick={() => window.print()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Invoice Print
        </button>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">Order No #{order?.id}</h1>


      <div className="flex justify-between mb-8 gap-6">
      {/* Customer Information */}
      <div className="w-1/2">

            <p>Total Bill: <span className="font-bold">{order?.total_amount}</span></p>
            <p className="text-red">
              Invoice Due: 
              <span className="font-bold">
                {(order?.total_amount ?? 0) - (order?.amount_paid ?? 0)}৳ 
              </span>
            </p>
            <p className="text-lg font-semibold">Customer Information</p>
            <p>Name: {order?.user_name}</p>
            <p>Phone: {order?.user_phone}</p>
            <p>Order Date: {new Date(order?.created_at || '').toLocaleDateString()}</p>
      </div>

</div>

      {/* Products Purchased */}
      <div className="border dark:border-strokedark border-[#eee] py-5 px-6 rounded-lg p-4 mb-4 shadow-lg bg-white">
        <h2 className="text-xl text-center font-semibold mb-2">Products Purchased</h2>
        <table className="w-full table-auto rounded-lg bg-white">
        <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Sl</th>
            <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Product Name & Image</th>
            <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Quantity</th>
            <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Unit Price</th>
            <th className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">Total Price</th>
            </tr>
        </thead>
          <tbody>
            {order?.items.map((item, index) => (
              <tr key={item.id} className="border dark:border-strokedark border-t border-b">
                <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{index + 1}</td>
                <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">
                  <div className="flex flex-col items-center">
                    <Image
                      src={item.product_image ?? '/media/products/invalid-product.png'} 
                      alt={item.product_name} 
                      className="w-10 h-10 mb-2" 
                    />
                    <span className="text-sm">{item.product_name}</span>
                  </div>
                </td>
                                <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{item.quantity}</td>
                <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{item.price}৳</td>
                <td className="text-center border dark:border-strokedark border-[#eee] py-5 p-3 px-6">{item.total_price}৳</td>
              </tr>
            ))}

<tr>
      <td colSpan={3} className="border-none text-right py-5 p-3 px-6 dark:text-white">
        
      </td>
      <td className="text-right border-none py-1 p-3 px-6 dark:text-white font-bold">
        Total Price :
      </td>

      <td className="text-center border-none py-1 p-3 px-6 dark:text-white">
        {/* Calculate total price */}
          <span>{order?.total_amount} ৳</span>
      </td>
    </tr>

    <tr>
      <td colSpan={3} className="border-none text-right py-5 p-3 px-6 dark:text-white">
        
      </td>
      <td className="text-right border-none py-1 p-3 px-6 dark:text-white font-bold">
        Discount :
      </td>

      <td className="text-center border-none py-1 p-3 px-6 dark:text-white">
        {/* Calculate total price */}
          <span>0%</span>
      </td>
    </tr>



    <tr>
      <td colSpan={3} className="border-none text-right py-5 p-3 px-6 dark:text-white">
        
      </td>
      <td className="text-right border-none py-1 p-3 px-6 dark:text-white font-bold">
        Amount Paid :
      </td>

      <td className="text-center border-none py-1 p-3 px-6 dark:text-white">
        {/* Calculate total price */}
          <span>{order?.amount_paid}৳</span>
      </td>
    </tr>
            <tr>
            <td colSpan={5} className="border-none text-right py-5 p-3 px-6 dark:text-white">
              <span>---------------------------------------------------</span>
              </td>
            </tr>

    <tr>
      <td colSpan={3} className="border-none text-right py-5 p-3 px-6 dark:text-white">
        
      </td>
      <td className="text-right border-none py-1 p-3 px-6 dark:text-white font-bold">
        Amount Due :
      </td>

      <td className="text-center border-none py-1 p-3 px-6 dark:text-white">
        {/* Calculate total price */}
          <span>{(order?.total_amount ?? 0) - (order?.amount_paid ?? 0)}৳</span>
      </td>
    </tr>




          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default OrdersView;
