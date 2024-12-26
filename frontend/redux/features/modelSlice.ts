import { apiSlice } from '../services/apiSlice';

interface Model {
    id: number;
    model_name: string;
    brandid: number;
    is_active: boolean;        // Add the active status field
    created_at: string;        // Add the created timestamp
    modified_at: string;
}

const modelApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getModels: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: Model[];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/models/?page=${page}&page_size=${page_size}`,
        }),

        getModelById: builder.query<Model, number>({
            query: (id) => `models/${id}/`, // Adjust the endpoint according to your API
        }),

        addModel: builder.mutation<Model, Partial<Model>>({
            query: (model) => ({
                url: '/models/',
                method: 'POST',
                body: model,
            }),
        }),

        updateModel: builder.mutation<Model, Partial<Model>>({
            query: (model) => ({
                url: `/models/${model.id}/`,
                method: 'PUT',
                body: model
            }),
        }),

        deleteModel: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/models/${id}/`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {

} = modelApiSlice