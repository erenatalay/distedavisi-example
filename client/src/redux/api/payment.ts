import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Payment } from "../../@types/response/Payment";
import { PaymentRequest } from "../../@types/request/PaymentRequest";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
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
    payment: builder.mutation<Payment, PaymentRequest>({
      query: (body) => ({
        url: "/payment",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled
          .then((response) => {
            window.alert("Appointment created successfully");
            window.location.href = "/#/appointment"

          })
          .catch(({ error }) => {
            window.alert(error.data.error.message);
          });
      },
 
    }),
   
  }),
});

export const {usePaymentMutation  } = paymentApi;
