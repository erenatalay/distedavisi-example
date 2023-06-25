export interface Appointment {
    data: Appointment[]
  }
  
  export interface Appointment {
    id: number
    dateTime: string
    status: string
    user: User
    doctor: Doctor
    clinic: Clinic
    treatment: Treatment
    linkPayment: LinkPayment
    payment: any
  }
  
  export interface User {
    id: number
    firstname: string
    lastname: string
    email: string
    birthday: string
    role: string
  }
  
  export interface Doctor {
    id: number
    firstname: string
    specialization: string
    lastname: string
    phone: string
    image: string
  }
  
  export interface Clinic {
    id: number
    name: string
    address: string
    contactNumber: string
    commissionRate: number
  }
  
  export interface Treatment {
    id: number
    name: string
    description: string
    price: string
  }
  
  export interface LinkPayment {
    id: number
    amount: string
    paymentLink: string
    description: string
  }
  