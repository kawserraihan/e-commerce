// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type {
// 	BaseQueryFn,
// 	FetchArgs,
// 	FetchBaseQueryError,
// } from '@reduxjs/toolkit/query';
// import { setAuth, logout } from '../features/authSlice';
// import { Mutex } from 'async-mutex';

// const mutex = new Mutex();
// const baseQuery = fetchBaseQuery({
// 	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
// 	credentials: 'include',
// 	prepareHeaders: (headers, { getState }) => {
// 		// Get the access token from localStorage
// 		const token = localStorage.getItem('access'); // Adjust if using a different storage method
// 		if (token) {
// 			headers.set('Authorization', `Bearer ${token}`);
// 		}
// 		return headers;
// 	},
// });

// // Main query function that handles re-authentication
// const baseQueryWithReauth: BaseQueryFn<
// 	string | FetchArgs,
// 	unknown,
// 	FetchBaseQueryError
// > = async (args, api, extraOptions) => {
// 	await mutex.waitForUnlock();
// 	let result = await baseQuery(args, api, extraOptions);

// 	// Check if the response was unauthorized
// 	if (result.error && result.error.status === 401) {
// 		if (!mutex.isLocked()) {
// 			const release = await mutex.acquire();
// 			try {
// 				// Attempt to refresh the token
// 				const refreshResult = await baseQuery(
// 					{
// 						url: '/jwt/refresh/',
// 						method: 'POST',
// 					},
// 					api,
// 					extraOptions
// 				);

// 				// If we successfully got a new access token
// 				if (refreshResult.data) {
// 					const { access, refresh } = refreshResult.data as {
// 						access: string;
// 						refresh: string; // Assuming the response includes both tokens
// 					};

// 					// Update the Redux state with new tokens
// 					api.dispatch(setAuth({ accessToken: access, refreshToken: refresh }));

// 					// Store the new access token in localStorage
// 					localStorage.setItem('access', access);
// 					localStorage.setItem('refresh', refresh);

// 					// Retry the original query with the new access token
// 					result = await baseQuery(args, api, extraOptions);
// 				} else {
// 					// If refreshing fails, log out the user
// 					api.dispatch(logout());
// 				}
// 			} finally {
// 				release();
// 			}
// 		} else {
// 			await mutex.waitForUnlock();
// 			result = await baseQuery(args, api, extraOptions);
// 		}
// 	}
// 	return result;
// };

// // Create the API slice with the base query that handles re-authentication
// export const apiSlice = createApi({
// 	reducerPath: 'api',
// 	baseQuery: baseQueryWithReauth,
// 	endpoints: builder => ({}),
// });


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setAuth, logout } from "../features/authSlice";
import Cookies from "js-cookie";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
  credentials: "include",
  prepareHeaders: (headers) => {
    // Get the access token from cookies
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Main query function that handles re-authentication
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // Check if the response was unauthorized
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Attempt to refresh the token
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: "/jwt/refresh/",
              method: "POST",
              body: { refresh: refreshToken }, // Pass refresh token in the body
            },
            api,
            extraOptions
          );

          // If we successfully got a new access token
          if (refreshResult.data) {
            const { access, refresh } = refreshResult.data as {
              access: string;
              refresh: string;
            };

            // Update the Redux state with new tokens
            api.dispatch(setAuth({ accessToken: access, refreshToken: refresh }));

            // Store the new tokens in cookies
            Cookies.set("accessToken", access, {
              secure: true,
              sameSite: "Strict",
              expires: 7,
            });
            Cookies.set("refreshToken", refresh, {
              secure: true,
              sameSite: "Strict",
              expires: 7,
            });

            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
          } else {
            // If refreshing fails, log out the user
            api.dispatch(logout());
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
          }
        } else {
          // No refresh token available, log out the user
          api.dispatch(logout());
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

// Create the API slice with the base query that handles re-authentication
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

