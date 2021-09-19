import { RemoveProperty } from '@/domain/usecases'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class RemoveOwnerPropertyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly removeProperty: RemoveProperty
  ) {}

  async handle (request: RemoveOwnerPropertyController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      await this.removeProperty.remove({
        propertyId: request.propertyId,
        ownerId: request.ownerId
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RemoveOwnerPropertyController {
  export type Request = {
    propertyId: string
    ownerId: string
  }
}
