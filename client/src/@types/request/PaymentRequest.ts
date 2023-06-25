export interface PaymentRequest {
    cardHolderName: string
    cardNumber: string
    cardExpirationDate: string
    cardCVV: string
    amount: string
    description: string
    clinic: number
    treatment: number
  }
  