import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	accessToken: string | null;
	refreshToken: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	isLoading: true,
	accessToken: null,
	refreshToken: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (
			state,
			action: PayloadAction<{ accessToken: string; refreshToken: string }>
		) => {
			state.isAuthenticated = true;
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;

			// Optionally store tokens in localStorage for persistence
			localStorage.setItem('access', action.payload.accessToken);
			localStorage.setItem('refresh', action.payload.refreshToken);
		},
		logout: state => {
			state.isAuthenticated = false;
			state.accessToken = null;
			state.refreshToken = null;

			// Optionally remove tokens from localStorage
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');
		},
		finishInitialLoad: state => {
			state.isLoading = false;
		},
	},
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;
