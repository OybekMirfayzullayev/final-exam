import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiClient = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://test.api.mydays.uz`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<{ token: string }, { username: string; password: any }>({
            query: (credentials) => ({
                url: "/api/v1/auth/login/",
                method: "POST",
                body: credentials,
            }),
        }),
        getUser: builder.query({
            query: () => "/api/v1/user/me/",
        }),
    }),
});

export const { useLoginMutation, useGetUserQuery } = ApiClient;
