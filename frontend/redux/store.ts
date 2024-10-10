import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './services/apiSlice';
import authReducer from "./features/authSlice";

// Create and configure the Redux store
export const makeStore = () => {
    return configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,  // API slice reducer
            auth: authReducer,                          // Auth slice reducer
        },
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(apiSlice.middleware),  // Adding API middleware
        devTools: process.env.NODE_ENV !== 'production',  // Enable Redux DevTools in development
    });
};

// Export types for use in components and hooks
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
