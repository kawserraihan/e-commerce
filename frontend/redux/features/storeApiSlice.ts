import { apiSlice } from '../services/apiSlice';


const storeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStores: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: [];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/stores/?page=${page}&page_size=${page_size}`,
        }),
        getStoreProductsById: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: [];
        }, { id: string; page: number; page_size: number }>({
            query: ({ id, page, page_size }) => `/stores/${id}/products/?page=${page}&page_size=${page_size}`,
        }),
    }),
});

export const {
    useGetStoresQuery,
    useGetStoreProductsByIdQuery
} = storeApiSlice