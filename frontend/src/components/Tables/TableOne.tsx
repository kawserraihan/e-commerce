import { Seller } from "@/types/sellers";
import Image from "next/image";

const sellerData: Seller[] = [
  {
    no: 1,
    logo:'/images/user/user-01.png',
    name: 'Rana',
    visitors: 38,
    revenues: 8050,
    sales: 15,
    commision: 5,
    length:4,
  },
  {
    no: 2,
    logo:'/images/user/user-05.png',
    name: 'Showmik',
    visitors: 101,
    revenues: 12200,
    sales: 21,
    commision: 4,
    length:4,
  },
  {
    no: 3,
    logo:'/images/user/user-09.png',
    name: 'Fahim',
    visitors: 56,
    revenues: 5600,
    sales: 11,
    commision: 8,
    length:4
  },
  {
    no: 4,
    logo:'/images/user/user-12.png',
    name: 'Rayhan',
    visitors: 200,
    revenues: 9500,
    sales: 5,
    commision: 5,
    length:4,
  },

];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Sellers
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Visitors
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenues
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Commision
            </h5>
          </div>
        </div>

        {sellerData.map((seller, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === seller.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={seller.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {seller.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{seller.visitors}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{seller.revenues}৳</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{seller.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{seller.commision}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
