import { apiSlice } from '../services/apiSlice';

interface ProductImage {
	id: number;
	additionalImages: FileList | null;
	product?: number;
	alt_text: string;
}

interface Product {
    id: number;
    product_name: string;
    product_type: string;
    product_description: string;
    product_code: string;
    product_image: File | null;
    quantity: number;
    price: number;
    slug: string;
    is_active: boolean;
    created_at: string;        // Add the created timestamp
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
    colors: number[] | null;
    color_names: string;
    sizes: number[] | null;
    size_names: string;
    additionalImages: FileList | null;

}

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: Product[];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/products/?page=${page}&page_size=${page_size}`,
        }),

        getProductById: builder.query<Product, number>({
            query: (id) => `products/${id}/`, // Adjust the endpoint according to your API
        }),

        addProduct: builder.mutation<Product, FormData>({
            query: (formData) => ({
                url: '/products/',
                method: 'POST',
                body: formData,
            }),
        }),

        updateProduct: builder.mutation<Product, { id: number; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/products/${id}/`,
                method: 'PUT',
                body: formData,
            }),
        }),

        deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/products/${id}/`,
                method: 'DELETE',
            }),
        }),
        // ----------------------------- Product End -----------------------------------

		// ---------------------ProductImage-related endpoints-----------------------------

		// Fetch images for a product
		getProductImages: builder.query<ProductImage[], number>({
			query: (productId) => `product-images/product/${productId}/`,
		}),

		// Add a new image to a product
		addProductImage: builder.mutation<ProductImage, FormData>({
			query: (formData) => ({
				url: '/product-images/',
				method: 'POST',
				body: formData,
			}),
		}),

		// Delete a product image
		deleteProductImage: builder.mutation<{ success: boolean }, number>({
			query: (imageId) => ({
				url: `/product-images/${imageId}/`,
				method: 'DELETE',
			}),
		}),

		// -------------------------- END Product Images ----------------------------------
		// ------------------------------- Stock Update -----------------------------------
		updateProductStock: builder.mutation<{ new_stock_quantity: number }, { id: number; quantity: number }>({
			query: ({ id, quantity }) => ({
				url: `/products/${id}/update-stock/`,
				method: 'PATCH',
				body: { quantity }, // Send as JSON, not FormData
			}),
		}),
    }),

});

export const {

} = productsApiSlice