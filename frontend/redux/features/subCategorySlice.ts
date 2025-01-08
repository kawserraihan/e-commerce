import { apiSlice } from '../services/apiSlice';

interface Subcategory {
    id: number;
    categoryid: number;
    category_name: string;
    subcategory_name: string;
    is_active: boolean;
    created_at: string;
    modified_at: string;
}

const subCategorySlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubcategories: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: Subcategory[];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/subcategories/?page=${page}&page_size=${page_size}`,
        }),

        getSubcategoryById: builder.query<Subcategory, number>({
            query: (id) => `subcategories/${id}/`, // Adjust the endpoint according to your API
        }),

        addSubcategory: builder.mutation<Subcategory, Partial<Subcategory>>({
            query: (subcategory) => ({
                url: '/subcategories/',
                method: 'POST',
                body: subcategory,
            }),
        }),

        updateSubcategory: builder.mutation<Subcategory, Partial<Subcategory>>({
            query: (subcategory) => ({
                url: `/subcategories/${subcategory.id}/`,
                method: 'PUT',
                body: subcategory
            }),
        }),

        deleteSubcategory: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/subcategories/${id}/`,
                method: 'DELETE',
            }),
        }),

        // -------------------- Subcategory End ------------------------

        getSubcategoriesByCategory: builder.query<any[], number>({
            query: (categoryId) => `/subcategories/by-category/${categoryId}/`,
        }),

    }),

});

export const {

} = subCategorySlice