import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Appointment } from "../../@types/response/Appointment";
import { AppointmentRequest } from "../../@types/request/AppointmentRequest";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
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
    updateAppointment: builder.mutation<Appointment, AppointmentRequest>({
      query: (body) => ({
        url: "/appointment/" + body.id,
        method: "PUT",
        body : {
          status : body.status,
          dateTime : body.dateTime
        },
      }),
    }),
    appointment: builder.query<Appointment, void>({
      query: () => ({
        url: "/appointment",
        method: "GET",
      }),
    }),
  }),
});

export const {useAppointmentQuery,useUpdateAppointmentMutation} = appointmentApi;
