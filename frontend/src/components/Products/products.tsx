'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetProductsQuery } from '../../../redux/features/authApiSlice';
import DeleteProductModal from './DeleteProductModal';
import ToggleButton from '@/components/FormElements/ToggleButton';
import Link from 'next/link';
import Image from "next/image";

interface Product {
  id: number;
  product_name: string;
  product_type: string;
  product_description: string;
  product_code: string;
  product_image: File | null;
  price: number;
  slug: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
  category: number;
  category_name: string;
  sub_category: number;
  subcategory_name: string;
  child_category: number;
  childcategory_name: string;
  brand: number;
  brand_name: string;
  model: number;
  model_name: string;
}

const ProductsComponent = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all'); // State to control active tab

  const { data, isLoading, error } = useGetProductsQuery({ page, page_size: pageSize });

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleViewProduct = (id: number) => {
    router.push(`/products/${id}`);
  };

  if (isLoading) return <p>Loading Products...</p>;
  if (error) return <p>Error loading Products.</p>;

  // Filter products based on active tab and search query
  const filteredProducts = data?.results?.filter((product: Product) => {
    const matchesTab = activeTab === 'all' || product.product_type === activeTab;
    const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil((data?.count || 0) / pageSize);

  return (
    <div>
      

      {/* Header with Add New button and Search box */}
      <div className="flex justify-between items-center pb-4">
        <Link href="/products/add">
          <button
            style={{ backgroundColor: '#67c5c3' }}
            className="text-md text-white px-4 py-2 font-bold rounded-full shadow hover:bg-opacity-90 focus:outline-none mr-3"
          >
            Add New
          </button>
        </Link>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Products"
          className="px-4 py-2 border rounded-md text-sm focus:ring focus:ring-primary"
        />
      </div>

      {/* Table displaying filtered products */}
      <div className="max-w-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* Tabs for filtering */}
      <div className="flex space-x-4 mb-4">
        {['all', 'wholesale', 'regular', 'seller'].map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === type ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-center dark:bg-meta-4">
              <th className="min-w-[30px] px-1 py-4 text-sm text-black dark:text-white">No.</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Product Image</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Product Name & Code</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Product Category</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Product Brand</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Regular Price</th>
              <th className="min-w-[140px] px-5 py-4 text-sm text-black dark:text-white">Status</th>
              <th className="min-w-[100px] px-5 py-4 text-sm text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((item, rowIndex) => (
              <tr key={item.id} className="border-b border-[#eee] dark:border-strokedark">
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{rowIndex + 1}</span>
                </td>
                <td className="border-b border-[#eee] px-12 py-5 pl-9 dark:border-strokedark xl:pl-9">
                  <div className="flex justify-center items-center">
                    <Image
                      src={typeof item.product_image === 'string' ? item.product_image : 'https://demoapi.anticbyte.com/media/products/invalid-product.png'}
                      alt={item.product_name}
                      width={500}  // Arbitrary value for the intrinsic layout
                      height={500} // Arbitrary value to maintain the aspect ratio
                      className="object-cover rounded w-22 h-22"  // Use your existing Tailwind classes
                      layout="intrinsic"  // Let Next.js calculate size based on width and height ratio
                    />
                  </div>
                </td>
                <td className="border-b border-[#eee] px-0 py-5 pl-9 dark:border-strokedark text-center xl:pl-0">
                  <h5 className="text-sm text-black dark:text-white">
                    Name: {item.product_name}
                  </h5>
                  <p className="text-sm">Code: {item.product_code}</p>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.category_name}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.brand_name}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-black dark:text-white">{item.price}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <ToggleButton 
                    isChecked={item.is_active} 
                    onToggle={(newStatus: boolean) => {}}
                  />
                </td>
                <td className="px-3 py-5 text-center">
                  <div className='space-x-3'>
                    <Link href={`/products/${item.id}`}>
                      <button className="text-blue-500 hover:underline">View</button>
                    </Link>
                    <Link href={`/products/edit/${item.id}`}>
                      <button className="text-primary hover:underline">Edit</button>
                    </Link>
                    <button
                      className="text-red hover:underline"
                      onClick={() => openDeleteModal(item)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="flex justify-end items-center mt-4 mb-4 mr-12 space-x-2">
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={!data?.previous}
            className={`px-4 py-2 text-center rounded-md border text-sm font-medium ${
              !data?.previous ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prevPage) => (data?.next ? prevPage + 1 : prevPage))}
            disabled={!data?.next}
            className={`px-4 py-2 text-center rounded-md border text-sm font-medium ${
              !data?.next ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white'
            }`}
          >
            Next
          </button>
        </div>

        {filteredProducts?.length === 0 && (
          <div className="py-4 text-center text-gray-500">
            No products found for {searchQuery}
          </div>
        )}
      </div>

      {/* Delete Product Modal */}
      {productToDelete && (
        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          product={productToDelete}
        />
      )}
    </div>
  );
};

export default ProductsComponent;
