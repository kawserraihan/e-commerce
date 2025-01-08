import { apiSlice } from '../services/apiSlice';
interface Banner {
    id: number;
    title: string;
    image: string;
    link: string;
    is_active: boolean;       
    created_at: string;        
    modified_at: string;
}

const bannerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBanner: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: Banner[];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/banners/?page=${page}&page_size=${page_size}`,
        }),
    }),
});

export const {
    useGetBannerQuery
} = bannerApiSlice