// "use client"

// import { useRouter } from 'next/router';

// interface Config {
//   label: string;
//   value: string | undefined; // Keeping this as is
//   id: number; // Add an id field for routing
//   is_active: boolean;
// }

// interface Props {
//   config: Config[];
//   onView: (id: number) => void; // Add a prop for the view function
// }

// export default function List({ config, onView }: Props) {
//   return (
//     <div>
//       {/* Header with Search and Add New button */}
//       <div className="flex justify-between items-center pb-4">
//         {/* Add New button */}
//         <div>
//           <button
//             style={{ backgroundColor: '#67c5c3' }}
//             className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3"
//           >
//             Add New
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="max-w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//         <table className="w-full table-auto">
//           <thead>
//             <tr className="bg-gray-2 text-center dark:bg-meta-4">
//               <th className="min-w-[30px] px-1 py-4 text-sm text-black text-center dark:text-white">No.</th>
//               <th className="min-w-[140px] px-5 py-4 text-sm text-black text-center dark:text-white">Category Name</th>
//               <th className="min-w-[100px] px-5 py-4 text-sm text-black text-center dark:text-white">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {config.map((item, rowIndex) => (
//               <tr key={rowIndex} className="border-b border-[#eee] dark:border-strokedark">
//                 <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center">
//                   <span className="text-black dark:text-white">{rowIndex + 1}</span> {/* Row number */}
//                 </td>
//                 <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center">
//                   <span className="text-black dark:text-white">{item.value}</span>
//                 </td>
          
//                 <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center">
//                   <button 
//                     className="text-blue-500 hover:underline" 
//                     onClick={() => onView(item.id)}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
