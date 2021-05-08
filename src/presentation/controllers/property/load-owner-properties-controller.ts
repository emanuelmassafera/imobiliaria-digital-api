import { LoadProperties } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadOwnerPropertiesController implements Controller {
  constructor (
    private readonly loadProperties: LoadProperties
  ) {}

  async handle (request: LoadOwnerPropertiesController.Request): Promise<HttpResponse> {
    try {
      const properties = await this.loadProperties.loadProperties({
        ownerId: request.ownerId,
        type: request.type,
        availableTo: request.availableTo,
        state: request.state,
        city: request.city,
        neighborhood: request.neighborhood,
        minimumOfBedrooms: request.minimumOfBedrooms,
        active: false
      })

      return properties.length ? ok(properties) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadOwnerPropertiesController {
  export type Request = {
    ownerId: string
    type?: string
    availableTo?: string
    state?: string
    city?: string
    neighborhood?: string
    minimumOfBedrooms?: number
  }
}
