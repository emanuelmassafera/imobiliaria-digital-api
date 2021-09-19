import { AccessDeniedError } from '@/domain/errors'
import { UpdateProperty } from '@/domain/usecases'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdateOwnerPropertyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateProperty: UpdateProperty
  ) {}

  async handle (request: UpdateOwnerPropertyController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const property = await this.updateProperty.update({
        propertyId: request.propertyId,
        ownerId: request.ownerId,
        type: request.type,
        availableTo: request.availableTo,
        price: request.price,
        condominium: request.condominium,
        iptu: request.iptu,
        address: (
          request.cep &&
          request.state &&
          request.city &&
          request.neighborhood &&
          request.street &&
          request.number
        )
          ? {
              cep: request.cep,
              state: request.state,
              city: request.city,
              neighborhood: request.neighborhood,
              street: request.street,
              number: request.number,
              complement: request.complement
            }
          : null,
        description: request.description,
        dimensions: request.dimensions,
        numberOfBedrooms: request.numberOfBedrooms,
        numberOfBathrooms: request.numberOfBathrooms,
        numberOfParkingSpaces: request.numberOfParkingSpaces,
        images: request.images,
        additionalInformation: request.additionalInformation,
        status: request.status
      })

      return property ? ok(property) : forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateOwnerPropertyController {
  export type Request = {
    propertyId: string
    ownerId: string
    type?: string
    availableTo?: string
    price?: number
    condominium?: number
    iptu?: number
    cep?: string
    state?: string
    city?: string
    neighborhood?: string
    street?: string
    number?: string
    complement?: string
    description?: string
    dimensions?: number
    numberOfBedrooms?: number
    numberOfBathrooms?: number
    numberOfParkingSpaces?: number
    images?: string[]
    additionalInformation?: any
    status?: string
  }
}
