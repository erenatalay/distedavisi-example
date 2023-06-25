import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Doctors } from "../../@types/response/Doctors";
export type GetDoctorDetailArg = {
  id: string;
  page : number;
};
export const doctorsApi = createApi({
  reducerPath: "doctorApi",
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
    doctors: builder.query<Doctors, GetDoctorDetailArg>({
      query: ({id,page}) => ({
        url: `/doctors/clinics/${id}?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const {useDoctorsQuery  } = doctorsApi;
