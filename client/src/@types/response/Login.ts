export interface Login {
    data: Data
  }
  
  export interface Data {
    id: number
    firstname: string
    lastname: string
    email: string
    birthday: string
    role: string
    tokens: Tokens
  }
  
  export interface Tokens {
    access_token: string
    refresh_token: string
  }
  