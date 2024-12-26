import { apiSlice } from '../services/apiSlice';

interface Color {
	id: number;
	color_name: string;
	is_active: boolean;  
	created_at: string;       
	modified_at: string;
}

const colorsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      getColors: builder.query<{
        count: number;
        next: string | null;
        previous: string | null;
        results: Color[];
    }, { page: number; page_size: number }>({
        query: ({ page, page_size }) => `/colors/?page=${page}&page_size=${page_size}`,
    }),

    getColorById: builder.query<Color, number>({
        query: (id) => `colors/${id}/`,
    }),

    addColor: builder.mutation<Color, Partial<Color>>({
        query: (color) => ({
            url: '/colors/',
            method: 'POST',
            body: color,
        }),
    }),

    updateColor: builder.mutation<Color, Partial<Color>>({
        query: (color) => ({
            url: `/colors/${color.id}/`,
            method: 'PUT',
            body: color
        }),
    }),

    deleteColor: builder.mutation<{ success: boolean; id: number }, number>({
        query: (id) => ({
            url: `/colors/${id}/`,
            method: 'DELETE',
        }),
    }),
    }),
});

export const {

} = colorsApiSlice