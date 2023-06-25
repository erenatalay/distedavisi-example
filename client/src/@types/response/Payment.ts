export interface Payment {
    data: Data
  }
  
  export interface Data {
    cardCVV: string
    cardExpirationDate: string
    cardHolderName: string
    cardNumber: string
    description: string
    treatment: Treatment
    clinic: Clinic
    amount: string
    id: number
  }
  
  export interface Treatment {
    id: number
    name: string
    description: string
    price: string
  }
  
  export interface Clinic {
    id: number
    name: string
    address: string
    contactNumber: string
    commissionRate: number
  }
  