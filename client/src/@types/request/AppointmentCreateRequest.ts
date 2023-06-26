export interface AppointmentCreateRequest {
    clinic: number
    treatment: number
    doctor: number
    payment?: number
    linkPayment?: number
    dateTime: Date
  }
  