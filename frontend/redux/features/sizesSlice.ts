import { apiSlice } from '../services/apiSlice';

interface Size {
	id: number;
	categoryid: number;
	subcategoryid: number;
	childcategoryid: number;
	category_name: string;
	subcategory_name: string;
	childcategory_name: string;
	size_name: string;
	is_active: boolean;        // Add the active status field
	created_at: string;        // Add the created timestamp
	modified_at: string;
}

const sizeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getSizes: builder.query<{
        count: number;
        next: string | null;
        previous: string | null;
        results: Size[];
    }, { page: number; page_size: number }>({
        query: ({ page, page_size }) => `/sizes/?page=${page}&page_size=${page_size}`,
    }),

    getSizeById: builder.query<Size, number>({
        query: (id) => `sizes/${id}/`, // Adjust the endpoint according to your API
    }),

    addSize: builder.mutation<Size, Partial<Size>>({
        query: (size) => ({
            url: '/sizes/',
            method: 'POST',
            body: size,
        }),
    }),

    updateSize: builder.mutation<Size, Partial<Size>>({
        query: (size) => ({
            url: `/sizes/${size.id}/`,
            method: 'PUT',
            body: size
        }),
    }),

    deleteSize: builder.mutation<{ success: boolean; id: number }, number>({
        query: (id) => ({
            url: `/sizes/${id}/`,
            method: 'DELETE',
        }),
    }),
    // ----------------------------- Size End -----------------------------------
    }),

});

export const {

} = sizeApiSlice