import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Doctors } from "../../@types/response/Doctors";
import { Treatments } from "../../@types/response/Treatments";
export type GetTreatmentDetailArg = {
  id: string;
  page : number;
};
export const treatmentsApi = createApi({
  reducerPath: "treatmentsApi",
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
    treatments: builder.query<Treatments, GetTreatmentDetailArg>({
      query: ({ id }) => ({
        url: "/treatments/doctors/" + id,
        method: "GET",
      }),
    }),
  }),
});

export const { useTreatmentsQuery } = treatmentsApi;
