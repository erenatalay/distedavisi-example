import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Login } from "../../@types/response/Login";
import { LoginRequest } from "../../@types/request/LoginRequest";
import { Register } from "../../@types/response/Register";
import { RegisterRequest } from "../../@types/request/RegisterRequest";
import { User } from "../../@types/response/User";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: async (headers, query) => {
      if (localStorage.getItem("token") !== null) {
        headers.set("authorization", "Bearer " + localStorage.getItem("token"));
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Login, LoginRequest>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled
          .then((response) => {
            localStorage.setItem(
              "token",
             response.data.data.tokens.access_token
            );
            window.location.reload()
          })
          .catch(({ error }) => {
            window.alert(error.data.error.message);
          });
      },
    }),
    register: builder.mutation<Register, RegisterRequest>({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled
          .then((response) => {
            window.location.href = "/";
          })
          .catch(({ error }) => {
            window.alert(error.data.error.message);
          });
      },
    }),

    userInfo: builder.query<User, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled
          .then((response) => {
            // window.location.href = "/";
          })
          .catch(({ error }) => {
            if(localStorage.getItem("token") !== null){
              window.location.href = "/";
              localStorage.removeItem("token")
            }
          });
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useUserInfoQuery } = authApi;
