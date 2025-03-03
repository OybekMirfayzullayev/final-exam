import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    is_auth: boolean;
    token: string | null;
}

const initialState: AuthState = {
    is_auth: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ is_auth: boolean }>) => {
            state.is_auth = action.payload.is_auth;
        },
        logout: (state) => {
            state.is_auth = false;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { setAuth, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

