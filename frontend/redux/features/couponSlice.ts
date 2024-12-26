import { apiSlice } from '../services/apiSlice';

interface Coupon {
    id: number;
    coupon: number;
    commision: number;
    minumum_amount: number;
    is_active: boolean;
    created_at: string;
    expiry_at: string | null;
    modified_at: string;

}

const couponApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCoupons: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: Coupon[];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/coupons/?page=${page}&page_size=${page_size}`,
        }),

        getCouponById: builder.query<Coupon, number>({
            query: (id) => `coupons/${id}/`, // Adjust the endpoint according to your API
        }),

        addCoupon: builder.mutation<Coupon, Partial<Coupon>>({
            query: (coupon) => ({
                url: '/coupons/',
                method: 'POST',
                body: coupon,
            }),
        }),

        updateCoupon: builder.mutation<Coupon, Partial<Coupon>>({
            query: (coupon) => ({
                url: `/coupons/${coupon.id}/`,
                method: 'PUT',
                body: coupon
            }),
        }),

        deleteCoupon: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/coupons/${id}/`,
                method: 'DELETE',
            }),
        }),
    }),

});

export const {

} = couponApiSlice