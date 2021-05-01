import { AddProperty } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddPropertyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProperty: AddProperty
  ) {}

  async handle (request: AddPropertyController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const property = await this.addProperty.add({
        ownerId: request.ownerId,
        type: request.type,
        availableTo: request.availableTo,
        price: request.price,
        condominium: request.condominium,
        iptu: request.iptu,
        address: {
          cep: request.cep,
          state: request.state,
          city: request.city,
          neighborhood: request.neighborhood,
          street: request.street,
          number: request.number,
          complement: request.complement
        },
        description: request.description,
        dimensions: request.dimensions,
        numberOfBedrooms: request.numberOfBedrooms,
        numberOfBathrooms: request.numberOfBathrooms,
        numberOfParkingSpaces: request.numberOfParkingSpaces,
        images: request.images,
        additionalInformation: request.additionalInformation,
        status: 'active',
        createdAt: new Date()
      })

      return ok(property)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddPropertyController {
  export type Request = {
    ownerId: string
    type: string
    availableTo: string
    price: number
    condominium?: number
    iptu?: number
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement?: string
    description: string
    dimensions: number
    numberOfBedrooms: number
    numberOfBathrooms: number
    numberOfParkingSpaces: number
    images: string[]
    additionalInformation?: any
  }
}
