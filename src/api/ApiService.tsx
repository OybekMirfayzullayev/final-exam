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
        login: builder.mutation<AuthResponse, { username: string; password: string }>({
            query: (credentials) => ({
                url: "/api/v1/auth/login/",
                method: "POST",
                body: credentials,
            }),
        }),
        getUser: builder.query({
            query: () => "/api/v1/user/me/",
        }),
        updateUser: builder.mutation({
            query: (userData) => ({
              url: "/api/v1/user/me/",
              method: "PUT",
              body: userData,
            }),
        }),
        getLeadList: builder.query({
            query: () => "/api/v1/lead/list/?size=40",
        }),
        getClients:builder.query({
            query: () =>"/api/v1/student/list/"
        }),
        getSubjects: builder.query({
            query: () => "/api/v1/course/subject-select"
        }),
        getTeachers: builder.query({
            query: () => "/api/v1/employee/select-list"
        }),
        getLessonTime: builder.query({
            query: () => "/api/v1/group/start-times"
        }),
        getLevel: builder.query({
            query: () => "/api/v1/course/12/level"
        }),
        getGroupList: builder.query({
            query: () => "/api/v1/group/group-select"
        }),
        addLead:builder.mutation({
            query: (newLead) => ({
                url: "/api/v1/lead/create/",
                method: "POST",
                body: newLead,
            }),
        })
    }),
});

export const { useLoginMutation, useGetUserQuery, useUpdateUserMutation, useGetLeadListQuery, useGetClientsQuery, useGetSubjectsQuery, useGetTeachersQuery, useGetLessonTimeQuery, useAddLeadMutation, useGetLevelQuery, useGetGroupListQuery } = ApiClient;
export interface AuthResponse{
    access: string;
    refresh: string;
    user_id: number;
    user_role: string;
}
