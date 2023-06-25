import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Clinics } from "../../@types/response/Clinics";
export type GetClinicDetailArg = {
  page: number;
};
export const clinicApi = createApi({
  reducerPath: "clinicApi",
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
    clinic: builder.query<Clinics, GetClinicDetailArg>({
      query: ({page}) => ({
        url: "/clinics?page="+ page,
        method: "GET",
      }),
    }),
  }),
});

export const {useClinicQuery  } = clinicApi;
