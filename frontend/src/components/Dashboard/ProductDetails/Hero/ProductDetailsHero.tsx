"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetProductBySlugQuery, useGetCategoriesQuery } from "../../../../../redux/features/authApiSlice";

interface Product {
  id: number;
  product_name: string;
  price: number;
  product_image: string | File;
  product_description: string;
  product_type: string;
  additionalImages: { id: string; image: string; alt_text?: string }[];
  product_variants: {
    size: string;
    size_name: string;
    color: string;
    color_name: string;
    variantImage?: string;
  }[];
  quantity: number;
}

interface Category {
  id: number;
  category_name: string;
}

interface SingleProductViewProps {
  slug: string;
}

const getImageSrc = (image: string | File | null | undefined): string =>
  image instanceof File ? URL.createObjectURL(image) : image || "/default-image.jpg";

export default function SingleProductView({ slug }: SingleProductViewProps) {
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]);

  const { data: product, isLoading: isProductLoading, isError: isProductError } = useGetProductBySlugQuery(slug);
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategoriesQuery({
    page: 1,
    page_size: 10,
  });

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCart(storedCart);

    if (product?.product_image) {
      setMainImage(getImageSrc(product.product_image));
    }
  }, [product?.product_image]);

  const handleAddToCart = () => {
    if (!product) {
      toast.error("Product not found!");
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.");
      return;
    }

    const cartItem = {
      id: product.id,
      product_name: product.product_name,
      price: product.price,
      product_image: getImageSrc(product.product_image),
      product_description: product.product_description,
      quantity,
      size: selectedSize,
      color: selectedColor,
      subtotal: product.price * quantity,
    };

    const existingIndex = cart.findIndex(
      (item) =>
        item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
    );

    const updatedCart = [...cart];
    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += cartItem.quantity;
      updatedCart[existingIndex].subtotal = updatedCart[existingIndex].price * updatedCart[existingIndex].quantity;
    } else {
      updatedCart.push(cartItem);
    }

    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    setIsModalOpen(true);
    toast.success("Item added to cart!");
  };

  const cartItem = useMemo(
    () => ({
      id: product?.id,
      product_name: product?.product_name,
      price: product?.price,
      product_image: getImageSrc(product?.product_image),
      product_description: product?.product_description,
      quantity,
      size: selectedSize,
      color: selectedColor,
      subtotal: product?.price * quantity,
    }),
    [product, quantity, selectedSize, selectedColor]
  );

  if (isProductLoading) {
    return <div className="text-center text-gray-500">Loading product details...</div>;
  }

  if (isProductError || !product) {
    return <div className="text-center text-red-500">Failed to load product data.</div>;
  }

  return (
    <div className="px-6 py-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-9">
          <nav className="text-sm text-gray-500 mb-4">
            Home / {product.product_type || "Category"} /{" "}
            <span className="text-green-500 font-bold">{product.product_name}</span>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="col-span-5">
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray shadow mb-4">
                <Image
                  src={mainImage}
                  alt={product.product_name}
                  className="max-w-full max-h-full object-contain"
                  width={400}
                  height={400}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.additionalImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setMainImage(image.image)}
                    className={`w-20 h-20 rounded-lg border shadow ${
                      mainImage === image.image ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    <Image src={image.image} alt={image.alt_text || "Thumbnail"} width={100} height={100} />
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-2xl font-bold">{product.product_name}</h1>
              <p className="text-green-500 font-bold text-xl">${Number(product.price).toFixed(2)}</p>
              <p className="text-gray-600">{product.product_description}</p>
              <div className="flex gap-4 mt-4">
                <div>
                  <label className="text-sm text-gray-500">Size:</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="">Select Size</option>
                    {product.product_variants.map((variant) => (
                      <option key={variant.size} value={variant.size}>
                        {variant.size_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Color:</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="">Select Color</option>
                    {product.product_variants.map((variant) => (
                      <option key={variant.color} value={variant.color}>
                        {variant.color_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-16 p-2 border rounded text-center"
                />
                <button
                  onClick={handleAddToCart}
                  className={`bg-green-500 text-white px-6 py-2 rounded ${
                    !selectedSize || !selectedColor ? "cursor-not-allowed opacity-50" : "hover:bg-green-600"
                  }`}
                  disabled={!selectedSize || !selectedColor}
                >
                  Add to Cart
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">Stock: {product.quantity} items available</p>
            </div>
          </div>
        </div>
        <aside className="col-span-3 hidden md:block">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          {isCategoriesLoading && <p className="text-gray-500">Loading categories...</p>}
          {isCategoriesError && <p className="text-red-500">Failed to load categories.</p>}
          <ul className="space-y-2">
            {categories?.results?.map((category: Category) => (
              <li key={category.id} className="text-gray-700 hover:text-green-500">
                {category.category_name}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Modal for cart confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Item Added to Cart</h2>
            <p className="text-sm mb-6">The item has been successfully added to your cart.</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
