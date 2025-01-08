import { apiSlice } from '../services/apiSlice';

interface Role {
    role__id: number;
    role__name: string;
}

interface UserProfile {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    is_active: boolean;
    is_staff: boolean;
    created_at: string;
    modified_at: string;
    roles: Role[];
    profiles: any;  // Define more specific types if available
}

const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserProfile: builder.query<UserProfile, string | undefined>({
            query: (token) => ({
                url: '/user-profile/',
                method: 'GET',
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            }),
        }),
    }),
});

export const {
    useGetUserProfileQuery,
} = profileApiSlice;

export default profileApiSlice;
