import { apiSlice } from '../services/apiSlice';

interface Childcategory {
    id: number;
    categoryid: number;
    subcategoryid: number;
    category_name: string;
    subcategory_name: string;
    childcategory_name: string;
    is_active: boolean;       
    created_at: string;      
    modified_at: string;
}

const childCategoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getChildcategories: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: Childcategory[];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/childcategories/?page=${page}&page_size=${page_size}`,
        }),

        getChildcategoryById: builder.query<Childcategory, number>({
            query: (id) => `childcategories/${id}/`, // Adjust the endpoint according to your API
        }),

        addChildcategory: builder.mutation<Childcategory, Partial<Childcategory>>({
            query: (childcategory) => ({
                url: '/childcategories/',
                method: 'POST',
                body: childcategory,
            }),
        }),

        updateChildcategory: builder.mutation<Childcategory, Partial<Childcategory>>({
            query: (childcategory) => ({
                url: `/childcategories/${childcategory.id}/`,
                method: 'PUT',
                body: childcategory
            }),
        }),

        deleteChildcategory: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/childcategories/${id}/`,
                method: 'DELETE',
            }),
        }),
        getChildcategoryByCategorySubcategory: builder.query<any[], { categoryid: number, subcategoryid: number }>({
            query: ({ categoryid, subcategoryid }) => `childcategories/by-category/by-subcategory/${categoryid}/${subcategoryid}/`,
        }),
    }),

});

export const {

} = childCategoriesApiSlice