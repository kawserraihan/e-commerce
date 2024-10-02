import type { Invoice } from "@/types/invoice";
import InvoiceButton from './invoiceButton';
import SearchComponent from "@/components/FormElements/searchComponent";
import Pagination from '@/components/FormElements/Pagination';

const invoiceData: Invoice[] = [
  {
    no: 1,
    invoiceID: 1,
    invoiceAmount: 500,
    customer: 'Iftekhar Ifty',
    customerEmail: 'iftekhar@gmail.com',
    customerAddress: 'Sector: 6, Road: 1, House: 13, Uttara, Dhaka',
    customerContact: '01608637246',
    lastPaymentDate: '12/08/2024',
    product: [{name: 'Blue Shirt', quantity: 1, price: 250}, {name: 'Red Shirt', quantity: 1, price: 250} ],
    paymentHistory: [{date: '12/08/2024', amount: 400, method:'Bkash'}],
    productTypes: 'Men Wear',
    discount: 0,
    deliveryCharge: 0,
    dueAmount: 100,
    paymentMethod: 'Bkash',
  },
  {
    no: 2,
    invoiceID: 2,
    invoiceAmount: 1000,
    customer: 'Kawser Raihan',
    customerEmail: 'iftekhar@gmail.com',
    customerAddress: 'Sector: 6, Road: 1, House: 13, Uttara, Dhaka',
    customerContact: '01608637246',
    lastPaymentDate: '12/08/2024',
    product: [{name: 'Blue Shirt', quantity: 1, price: 250}, {name: 'Red Shirt', quantity: 1, price: 250} ],
    paymentHistory: [{date: '12/08/2024', amount: 400, method:'Bkash'}],
    productTypes: 'Men Wear',
    discount: 0,
    deliveryCharge: 0,
    dueAmount:200,
    paymentMethod: 'Nagad',
  },
  {
    no: 3,
    invoiceID: 3,
    invoiceAmount: 1500,
    customer: 'Imamul Hasan Rana',
    customerEmail: 'iftekhar@gmail.com',
    customerAddress: 'Sector: 6, Road: 1, House: 13, Uttara, Dhaka',
    customerContact: '01608637246',
    lastPaymentDate: '12/08/2024',
    product: [{name: 'Blue Shirt', quantity: 1, price: 250}, {name: 'Red Shirt', quantity: 1, price: 250} ],
    paymentHistory: [{date: '12/08/2024', amount: 400, method:'Bkash'}],
    productTypes: 'Men Wear',
    discount: 0,
    deliveryCharge: 0,
    dueAmount:300,
    paymentMethod: 'Cash',
  },
  {
    no: 4,
    invoiceID: 4,
    invoiceAmount: 1800,
    customer: 'Kawser Raihan',
    customerEmail: 'iftekhar@gmail.com',
    customerAddress: 'Sector: 6, Road: 1, House: 13, Uttara, Dhaka',
    customerContact: '01608637246',
    lastPaymentDate: '12/08/2024',
    product: [{name: 'Blue Shirt', quantity: 1, price: 250}, {name: 'Red Shirt', quantity: 1, price: 250} ],
    paymentHistory: [{date: '12/08/2024', amount: 400, method:'Bkash'}],
    productTypes: 'Men Wear',
    discount: 0,
    deliveryCharge: 0,
    dueAmount:400,
    paymentMethod: 'Bkash',
  },
  {
    no: 5,
    invoiceID: 5,
    invoiceAmount: 900,
    customer: 'Fahim Ahmed',
    customerEmail: 'iftekhar@gmail.com',
    customerAddress: 'Sector: 6, Road: 1, House: 13, Uttara, Dhaka',
    customerContact: '01608637246',
    lastPaymentDate: '12/08/2024',
    product: [{name: 'Blue Shirt', quantity: 1, price: 250}, {name: 'Red Shirt', quantity: 1, price: 250} ],
    paymentHistory: [{date: '12/08/2024', amount: 400, method:'Bkash'}],
    productTypes: 'Men Wear',
    discount: 0,
    deliveryCharge: 0,
    dueAmount:700,
    paymentMethod: 'Bkash',
  },
  {
    no: 6,
    invoiceID: 6,
    invoiceAmount: 500,
    customer: 'Iftekhar Ifty',
    customerEmail: 'iftekhar@gmail.com',
    customerAddress: 'Sector: 6, Road: 1, House: 13, Uttara, Dhaka',
    customerContact: '01608637246',
    lastPaymentDate: '12/08/2024',
    product: [{name: 'Blue Shirt', quantity: 1, price: 250}, {name: 'Red Shirt', quantity: 1, price: 250} ],
    paymentHistory: [{date: '12/08/2024', amount: 400, method:'Bkash'}],
    productTypes: 'Men Wear',
    discount: 0,
    deliveryCharge: 0,
    dueAmount:100,
    paymentMethod: 'Bkash',
  },
];

const Invoice = () => {
  const currentPage = 1; // This could come from query params or state
  const totalPages = 10;
  return (
    
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-9">
      
      <div className="py-7 -mt-25 -ml-7">
          <SearchComponent/>

        </div>
        
      <div className="max-w-full overflow-x-auto">
        
        <table className="w-full table-auto">
          
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[10px] px-5 py-4 text-sm text-black dark:text-white">
                No
              </th>
              <th className="min-w-[200px] px-4 py-4 text-sm text-black dark:text-white xl:pl-1">
                Invoice No & Invoice Date
              </th>
              <th className="min-w-[220px] px-4 py-4 text-sm text-black dark:text-white xl:pl-1">
                Customer Name & Contact No.
              </th>
              <th className="min-w-[150px] px-4 py-4 text-sm text-black dark:text-white xl:pl-0">
                Payment Method
              </th>
             
              <th className="min-w-[120px] px-4 py-4 text-sm text-black dark:text-white">
                Total Bill
              </th>
              <th className="min-w-[120px] px-4 py-4 text-sm text-black dark:text-white">
                Paid Amount & Due
              </th>
              <th className="px-4 py-4 text-sm text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoiceItem, key) => (
              <tr key={key}>
                
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {invoiceItem.no}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-1 py-5 pl-9 dark:border-strokedark xl:pl-9">
                <h5 className="text-sm text-black dark:text-white">
                    Invoice No: {invoiceItem.no}
                  </h5>

                  <p className="text-sm">Invoice Amount: {invoiceItem.invoiceAmount}</p>
                </td>
                <td className="border-b border-[#eee] px-2 py-5 pl-9 dark:border-strokedark xl:pl-2">
                  <h5 className="text-sm text-black dark:text-white">
                    Name: {invoiceItem.customer}
                  </h5>
                  <p className="text-sm">Contact: {invoiceItem.customerContact}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-8">
                  <p className="text-black dark:text-white">
                    {invoiceItem.paymentMethod}
                  </p>
                </td>
        
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {invoiceItem.invoiceAmount} ৳
                  </p>
                </td>
                {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm text-sm bg-success text-success`}
                  >
                    {packageItem.paymentStatus}
                  </p>
                </td> */}
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-5">
          <h5 className="text-sm text-black dark:text-white">
            {/* Map over paymentHistory to display each payment */}
            {invoiceItem.paymentHistory.map((payment, index) => (
              <div key={index}>
                <p>Paid Amount: <span className="font-bold">{payment.amount} ৳</span></p>
                <p>Due Amount: <span className="font-bold">{invoiceItem.dueAmount} ৳</span></p>
              </div>
            ))}
          </h5>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
  <div className="flex items-center justify-between space-x-3.5">
    <div key={invoiceItem.no} className="invoice-item">
      <InvoiceButton id={invoiceItem.no} />
    </div>

    <div className="flex space-x-2">
      <button className="hover:text-primary">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
        >
          <path d="M13.75 2.48H11.59V2C11.59 1.15 10.91 0.48 10.07 0.48H7.9C7.06 0.48 6.38 1.15 6.38 2V2.48H4.22C3.4 2.48 2.73 3.15 2.73 4V4.81C2.73 5.43 3.1 5.93 3.63 6.16L4.08 15.47C4.13 16.62 5.09 17.52 6.24 17.52H11.7C12.85 17.52 13.81 16.62 13.87 15.47L14.34 6.13C14.88 5.91 15.24 5.37 15.24 4.78V3.94C15.24 3.15 14.57 2.48 13.75 2.48ZM4.02 3.97C4.02 3.85 4.11 3.74 4.25 3.74H13.75C13.87 3.74 13.98 3.83 13.98 3.97V4.81C13.98 4.92 13.89 5.03 13.75 5.03H4.25C4.13 5.03 4.02 4.92 4.02 4.81V3.97ZM11.73 16.26H6.27C5.79 16.26 5.4 15.89 5.37 15.38L4.95 6.27H13.08L12.66 15.38C12.6 15.86 12.21 16.26 11.73 16.26Z" />
          <path d="M9 9.11C8.66 9.11 8.35 9.39 8.35 9.76V13.33C8.35 13.67 8.63 13.98 9 13.98C9.34 13.98 9.65 13.7 9.65 13.33V9.76C9.65 9.39 9.34 9.11 9 9.11Z" />
          <path d="M11.25 9.68C10.88 9.65 10.6 9.9 10.57 10.27L10.41 12.74C10.38 13.08 10.63 13.39 11 13.42C11.39 13.42 11.67 13.16 11.67 12.83L11.84 10.35C11.84 9.98 11.59 9.7 11.25 9.68Z" />
          <path d="M6.72 9.68C6.38 9.7 6.1 10.01 6.13 10.35L6.33 12.83C6.36 13.16 6.64 13.42 7 13.42C7.34 13.42 7.62 13.08 7.6 12.74L7.4 10.27C7.4 9.9 7.09 9.65 6.72 9.68Z" />
        </svg>
      </button>

      <button className="hover:text-primary">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
        >
          <path d="M16.88 11.67C16.54 11.67 16.23 11.95 16.23 12.32V14.82C16.23 15.08 16.03 15.27 15.78 15.27H2.22C1.97 15.27 1.77 15.08 1.77 14.82V12.32C1.77 11.98 1.49 11.67 1.12 11.67C0.76 11.67 0.48 11.95 0.48 12.32V14.82C0.48 15.78 1.24 16.54 2.19 16.54H15.78C16.73 16.54 17.49 15.78 17.49 14.82V12.32C17.52 11.95 17.21 11.67 16.88 11.67Z" />
          <path d="M8.55 12.35C8.66 12.46 8.83 12.52 9 12.52C9.17 12.52 9.31 12.46 9.45 12.35L13.47 8.44C13.73 8.18 13.73 7.79 13.5 7.54C13.25 7.28 12.85 7.28 12.6 7.51L9.65 10.41V2.11C9.65 1.77 9.37 1.46 9 1.46C8.66 1.46 8.35 1.74 8.35 2.11V10.41L5.4 7.54C5.15 7.28 4.75 7.31 4.5 7.54C4.25 7.79 4.28 8.18 4.5 8.44L8.55 12.35Z" />
        </svg>
      </button>
    </div>
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

export default Invoice;
