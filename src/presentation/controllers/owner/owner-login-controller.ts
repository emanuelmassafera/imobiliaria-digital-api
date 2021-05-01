import { UserNotFoundError, WrongPasswordError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class OwnerLoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: OwnerLoginController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      try {
        const authenticationResult = await this.authentication.auth({
          email: request.email,
          password: request.password
        })

        return ok(authenticationResult)
      } catch (error) {
        if (error instanceof UserNotFoundError || error instanceof WrongPasswordError) {
          return forbidden(error)
        } else {
          return serverError(error)
        }
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace OwnerLoginController {
  export type Request = {
    email: string
    password: string
  }
}
