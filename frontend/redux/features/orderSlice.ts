import { apiSlice } from '../services/apiSlice';

interface OrderItem {
    id: number;
    product: number;
    product_name: string;
    product_image: string | null;
    quantity: number;
    price: number;
    total_price: number;
}

interface UserOrder {
    id: number;
    user: number;
    user_name: string;
    user_phone: string;
    payment_status: string;
    amount_paid: number;
    total_amount: number;
    delivery_status: string;
    created_at: string;
    items: OrderItem[];
}

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query<{
            count: number;
            next: string | null;
            previous: string | null;
            results: UserOrder[];
        }, { page: number; page_size: number }>({
            query: ({ page, page_size }) => `/orders/?page=${page}&page_size=${page_size}`,
        }),

        getOrderById: builder.query<UserOrder, number>({
            query: (id) => `orders/${id}/`,
        }),

        addOrder: builder.mutation<UserOrder, Partial<UserOrder>>({
            query: (orderData) => ({
                url: '/orders/',
                method: 'POST',
                body: orderData,
            }),
        }),
    }),
});

export const {

} = orderApiSlice