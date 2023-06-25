import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { clinicApi } from "./api/clinics";
import { doctorsApi } from "./api/doctors";
import { treatmentsApi } from "./api/treatments";
import { paymentApi } from "./api/payment";
import { appointmentApi } from "./api/appointment";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
    [doctorsApi.reducerPath]: doctorsApi.reducer,
    [treatmentsApi.reducerPath]: treatmentsApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>getDefaultMiddleware()
    .concat(
      authApi.middleware,
      clinicApi.middleware,
      doctorsApi.middleware,
      treatmentsApi.middleware,
      paymentApi.middleware,
      appointmentApi.middleware
      
      ),
});

export default store;
