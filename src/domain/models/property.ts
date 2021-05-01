export type PropertyModel = {
  id: string
  ownerId: string
  type: string
  availableTo: string
  price: number
  condominium?: number
  iptu?: number
  address: {
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement?: string
  }
  description: string
  dimensions: number
  numberOfBedrooms: number
  numberOfBathrooms: number
  numberOfParkingSpaces: number
  images: string[]
  additionalInformation?: any
  status: string
  createdAt: Date
}
