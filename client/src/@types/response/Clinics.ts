import { Doctors } from "./Doctors"

  export interface Clinics {
    data: Data
  }
  
  export interface Data {
    results: Result[]
    total: number
    perPage: number
    currentPage: number
    totalPages: number
  }
  
  export interface Result {
    id: number
    name: string
    address: string
    contactNumber: string
    commissionRate: number
    doctors: Doctor[]
  }
  
  export interface Doctor {
    id: number
    firstname: string
    specialization: string
    lastname: string
    phone: string
    image: string
    treatments: Treatment[]
  }
  
  export interface Treatment {
    id: number
    name: string
    description: string
    price: string
  }
  