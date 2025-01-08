import { apiSlice } from '../services/apiSlice';
interface Brand {
	id: number;
	brand_name: string;
	is_active: boolean;      
	created_at: string;     
	modified_at: string;
}

const brandApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBrands: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: Brand[];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/brands/?page=${page}&page_size=${page_size}`,
        }),

        getBrandById: builder.query<Brand, number>({
            query: (id) => `brands/${id}/`, 
        }),

        addBrand: builder.mutation<Brand, Partial<Brand>>({
            query: (brand) => ({
                url: '/brands/',
                method: 'POST',
                body: brand,
            }),
        }),

        updateBrand: builder.mutation<Brand, Partial<Brand>>({
            query: (brand) => ({
                url: `/brands/${brand.id}/`,
                method: 'PUT',
                body: brand
            }),
        }),

        deleteBrand: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/brands/${id}/`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {

} = brandApiSlice