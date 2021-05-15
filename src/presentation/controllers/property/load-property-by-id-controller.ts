import { LoadPropertyById } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadPropertyByIdController implements Controller {
  constructor (
    private readonly loadPropertyById: LoadPropertyById
  ) {}

  async handle (request: LoadPropertyByIdController.Request): Promise<HttpResponse> {
    try {
      const property = await this.loadPropertyById.loadPropertyById({
        propertyId: request.propertyId,
        active: true
      })

      return property ? ok(property) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadPropertyByIdController {
  export type Request = {
    propertyId: string
  }
}
