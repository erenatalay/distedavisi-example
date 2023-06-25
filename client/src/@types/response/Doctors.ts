export interface Doctors {
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
  firstname: string
  specialization: string
  lastname: string
  phone: string
  image: string
  clinic: Clinic
  treatments: Treatment[]
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
