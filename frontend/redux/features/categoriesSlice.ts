import { apiSlice } from '../services/apiSlice';

interface Category {

    id: number;
    category_name: string;
    is_active: boolean;        
    created_at: string;     
    modified_at: string;
}

const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: Category[];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/categories/?page=${page}&page_size=${page_size}`,
        }),

        getCategoryById: builder.query<Category, number>({
            query: (id) => `categories/${id}/`,
        }),

        addCategory: builder.mutation<Category, Partial<Category>>({
            query: (category) => ({
                url: '/categories/',
                method: 'POST',
                body: category,
            }),
        }),
        updateCategory: builder.mutation<Category, Partial<Category>>({
            query: (category) => ({
                url: `/categories/${category.id}/`,
                method: 'PUT',
                body: category
            }),
        }),
        deleteCategory: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/categories/${id}/`,
                method: 'DELETE',
            }),
        }),

    }),

});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApiSlice