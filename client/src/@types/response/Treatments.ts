  export interface Treatments {
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
    description: string
    price: string
  }
  