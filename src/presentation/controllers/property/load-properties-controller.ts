import { LoadProperties } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadPropertiesController implements Controller {
  constructor (
    private readonly loadProperties: LoadProperties
  ) {}

  async handle (request: LoadPropertiesController.Request): Promise<HttpResponse> {
    try {
      const properties = await this.loadProperties.loadProperties({
        type: request.type,
        availableTo: request.availableTo,
        state: request.state,
        city: request.city,
        neighborhood: request.neighborhood,
        minimumOfBedrooms: Number(request.minimumOfBedrooms),
        active: true
      })

      return properties.length ? ok(properties) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadPropertiesController {
  export type Request = {
    type?: string
    availableTo?: string
    state?: string
    city?: string
    neighborhood?: string
    minimumOfBedrooms?: string
  }
}
