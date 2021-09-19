import { PropertyModel } from '@/domain/models'

export interface UpdateProperty {
  update: (params: UpdateProperty.Params) => Promise<UpdateProperty.Result>
}

export namespace UpdateProperty {
  export type Params = {
    propertyId: string
    ownerId: string
    type?: string
    availableTo?: string
    price?: number
    condominium?: number
    iptu?: number
    address?: {
      cep: string
      state: string
      city: string
      neighborhood: string
      street: string
      number: string
      complement?: string
    }
    description?: string
    dimensions?: number
    numberOfBedrooms?: number
    numberOfBathrooms?: number
    numberOfParkingSpaces?: number
    images?: string[]
    additionalInformation?: any
    status?: string
  }
  export type Result = PropertyModel
}
