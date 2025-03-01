import apiSlice from "./apiSlice";
import { MAIN_URL } from "../constant.js";
import { logout } from "../auth/authSlice.js";

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register:builder.mutation({
            query: (data) => ({
                url:`${MAIN_URL}/register`,
                method: 'POST',
                body:data
            }),
        }),
        login:builder.mutation({
            query: (data) => ({
                url:`${MAIN_URL}/login`,
                method: 'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query: () => ({
                url:`${MAIN_URL}/logout`,
                method: 'POST',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("accessToken")}`
                },
            }),
        }),
        updateProfile:builder.mutation({
            query: (data) => ({
                url:`${MAIN_URL}/update-profile`,
                method: 'PUT',
                body:data
                }),
        })
    }),
})

export const {useRegisterMutation,useLoginMutation,useLogoutMutation,useUpdateProfileMutation} =userApiSlice;