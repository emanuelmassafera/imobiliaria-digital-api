import { LoadPropertyById } from '@/domain/usecases'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadOwnerPropertyByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadPropertyById: LoadPropertyById
  ) {}

  async handle (request: LoadOwnerPropertyByIdController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const property = await this.loadPropertyById.loadPropertyById({
        propertyId: request.propertyId,
        ownerId: request.ownerId,
        active: false
      })

      return property ? ok(property) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadOwnerPropertyByIdController {
  export type Request = {
    propertyId: string
    ownerId: string
  }
}
