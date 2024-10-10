import { apiSlice } from "../services/apiSlice";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface CreateUserResponse {
  success: boolean;
  user: User;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch the authenticated user's details
    retrieveUser: builder.query<User, void>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        const result = await baseQuery('/users/me/');
        if (result.error) {
          console.error("Retrieve User Error:", result.error);  // Log the error to the console
          return { error: result.error as FetchBaseQueryError };
        }
        return { data: result.data as User };  // Ensure result.data is cast as User
      },
    }),

    // Login mutation for handling JWT authentication
    login: builder.mutation({
      queryFn: async ({ email, password }, queryApi, extraOptions, baseQuery) => {
        // Log email and password for debugging
        console.log("Login email:", email);
        console.log("Login password:", password);

        const result = await baseQuery({
          url: '/jwt/create',
          method: 'POST',
          body: { email, password },
        });
        if (result.error) {
          console.error("Login Error:", result.error);  // Log the error to the console
          return { error: result.error as FetchBaseQueryError };
        }
        return { data: result.data };  // Correctly return the data
      },
    }),

    // Registration mutation to create a new user
    register: builder.mutation({
      queryFn: async ({
        first_name,
        last_name,
        email,
        password,
        re_password,
      }, queryApi, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/users/',
          method: 'POST',
          body: { first_name, last_name, email, password, re_password },
        });
        if (result.error) {
          console.error("Register Error:", result.error);  // Log the error to the console
          return { error: result.error as FetchBaseQueryError };
        }
        return { data: result.data };  // Ensure result.data is returned properly
      },
    }),

    // Verify JWT token mutation
    verify: builder.mutation({
      queryFn: async (_, queryApi, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/jwt/verify/',
          method: 'POST',
        });
        if (result.error) {
          console.error("Verify Error:", result.error);  // Log the error to the console
          return { error: result.error as FetchBaseQueryError };
        }
        return { data: result.data };
      },
    }),

    // Logout mutation
    logout: builder.mutation({
      queryFn: async (_, queryApi, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/logout/',
          method: 'POST',
        });
        if (result.error) {
          console.error("Logout Error:", result.error);  // Log the error to the console
          return { error: result.error as FetchBaseQueryError };
        }
        return { data: result.data };
      },
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
} = authApiSlice;

export default authApiSlice;
