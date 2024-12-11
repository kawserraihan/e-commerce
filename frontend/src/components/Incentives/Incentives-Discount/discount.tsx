import { Discount } from "@/types/discount";
import SearchComponent from "@/components/FormElements/searchComponent";
import Pagination from '@/components/FormElements/Pagination';
import Image from "next/image";



const discountData: Discount[] = [
  {
    no: 1,
    product_image: "/images/product/product-02.png",
    product_name: "Apple Laptop",
    product_code: "PR-0001",
    product_price: 78000,
    stock: 11,
    discount: 5000,
  },
  
  {
    no: 2,
    product_image: "/images/product/product-01.png",
    product_name: "Smart Watch",
    product_code: "PR-0002",
    product_price: 12000,
    stock: 65,
    discount: 3000,
  },
  {
    no: 3,
    product_image: "/images/product/smart-watch.jpg",
    product_name: "Smart Watch",
    product_code: "PR-0003",
    product_price: 32500,
    stock: 20,
    discount: 1000,
  },
  {
    no: 4,
    product_image: "/images/product/product-01.png",
    product_name: "Apple Watch",
    product_code: "PR-0004",
    product_price: 18000,
    stock: 31,
    discount: 5000,
  },
  {
    no: 5,
    product_image: "/images/product/product-02.png",
    product_name: "Apple Watch",
    product_code: "PR-0005",
    product_price: 78000,
    stock: 11,
    discount: 5000,
  },
];

const Discounts = () => {
  const currentPage = 1; // This could come from query params or state
  const totalPages = 10;
  
  return (
    <div>
      
      {/* Header with Search and Add New button */}
      <div className="flex justify-between items-center pb-4">
        {/* Search input */}
        <div>
          <SearchComponent/>

        </div>

        {/* Add New button */}
            <div>
              
            <button style={{ backgroundColor: '#67c5c3' }} className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3">
                Add New
            </button>
            </div>
      </div>

      {/* Table */}
      <div className="max-w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-center dark:bg-meta-4">
              <th className="min-w-[30px] px-1 py-4 text-sm text-black text-center dark:text-white">
                No
              </th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-center text-black dark:text-white xl:pl-1">
                Product Image
              </th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-center text-black dark:text-white xl:pl-1">
                Product Name & Code
              </th>
              <th className="min-w-[100px] px-5 py-4 text-sm text-center text-black dark:text-white">
                Price
              </th>
              <th className="min-w-[100px] px-5 py-4 text-sm text-center text-black dark:text-white">
                Stock
              </th>
              <th className="px-8 py-4 text-sm text-black text-center dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {discountData.map((discountItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center">
                  <p className="text-black dark:text-white">
                    {discountItem.no}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-12 py-5 pl-9 dark:border-strokedark xl:pl-9">
                <div className="flex justify-center items-center">
                  <Image
                    src={discountItem.product_image}
                    alt={discountItem.product_name}
                    width={500}  // Arbitrary value for the intrinsic layout
                    height={500} // Arbitrary value to maintain the aspect ratio
                    className="object-cover rounded w-22 h-22"  // Use your existing Tailwind classes
                    layout="intrinsic"  // Let Next.js calculate size based on width and height ratio
                  />
                </div>
                </td>
                <td className="border-b border-[#eee] px-2 py-5 pl-9 dark:border-strokedark text-center xl:pl-0">
                  <h5 className="text-sm text-black dark:text-white">
                    Name: {discountItem.product_name}
                  </h5>
                  <p className="text-sm">Code: {discountItem.product_code}</p>
                  
                </td>
                <td className="border-b border-[#eee] px-2 py-5 pl-9 dark:border-strokedark text-center xl:pl-0">
                  <h5 className="text-sm text-red dark:text-white">
                    Product Price: {discountItem.product_price}
                  </h5>
                  <p className="text-sm text-green-600">Offered Price: {discountItem.product_price - discountItem.discount}</p>
                  
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center xl:pl-2">
                  <p className="text-black dark:text-white">
                    {discountItem.stock}
                  </p>
                </td>
                
                <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                  <div className="flex items-center justify-center space-x-3.5">
                    <button className="hover:text-primary">
                      {/* View Icon */}
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      {/* Edit Icon */}
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM12.7348 15.3094C12.7098 15.8531 12.2785 16.2844 11.7348 16.2844H6.27852C5.73477 16.2844 5.30352 15.8531 5.27852 15.3094L4.84414 6.1719H13.2004L12.7348 15.3094Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      {/* Delete Icon */}
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.3285 3.50627H12.4223V1.9469C12.4223 1.31252 11.8973 0.787521 11.2629 0.787521H6.75352C6.11914 0.787521 5.59414 1.31252 5.59414 1.9469V3.50627H1.68789C1.39727 3.50627 1.15664 3.7469 1.15664 4.03752C1.15664 4.32815 1.39727 4.56877 1.68789 4.56877H2.21289L2.81289 15.1875C2.88414 16.5406 4.02227 17.5844 5.37539 17.5844H12.6254C13.9785 17.5844 15.1166 16.5406 15.1879 15.1875L15.7879 4.56877H16.3129C16.6035 4.56877 16.8441 4.32815 16.8441 4.03752C16.8441 3.7469 16.6035 3.50627 16.3285 3.50627ZM7.12539 1.9469C7.12539 1.8344 7.20977 1.7219 7.35039 1.7219H10.641C10.7535 1.7219 10.866 1.80627 10.866 1.9469V3.50627H7.12539V1.9469ZM14.1254 15.1219C14.0723 16.1156 13.2 16.9781 12.2066 16.9781H5.37539C4.38164 16.9781 3.50977 16.1156 3.45664 15.1219L2.86539 4.56877H14.1379L14.1254 15.1219Z"
                          fill=""
                        />
                        <path
                          d="M7.59375 14.2884C7.88437 14.2884 8.09375 14.0665 8.09375 13.7628V7.7984C8.09375 7.50777 7.88437 7.2984 7.59375 7.2984C7.30312 7.2984 7.09375 7.50777 7.09375 7.7984V13.7628C7.09375 14.0665 7.30312 14.2884 7.59375 14.2884Z"
                          fill=""
                        />
                        <path
                          d="M10.5 14.2884C10.7906 14.2884 11 14.0665 11 13.7628V7.7984C11 7.50777 10.7906 7.2984 10.5 7.2984C10.2094 7.2984 10 7.50777 10 7.7984V13.7628C10 14.0665 10.2094 14.2884 10.5 14.2884Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pt-4 pb-13">
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
      
        
        
      </div>
    </div>
  );
};

export default Discounts;
