import { CpfInUseError, EmailInUseError, UserNotFoundError, WrongPasswordError } from '@/domain/errors'
import { AddOwner, Authentication } from '@/domain/usecases'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class RegisterOwnerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOwner: AddOwner,
    private readonly authentication: Authentication
  ) {}

  async handle (request: RegisterOwnerController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      try {
        await this.addOwner.add({
          name: request.name,
          email: request.email,
          password: request.password,
          cpf: request.cpf,
          phoneNumber: request.phoneNumber,
          address: {
            cep: request.cep,
            state: request.state,
            city: request.city,
            neighborhood: request.neighborhood,
            street: request.street,
            number: request.number,
            complement: request.complement
          },
          createdAt: new Date()
        })
      } catch (error) {
        if (error instanceof EmailInUseError || error instanceof CpfInUseError) {
          return forbidden(error)
        } else {
          return serverError(error)
        }
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

export namespace RegisterOwnerController {
  export type Request = {
    name: string
    email: string
    emailConfirmation: string
    cpf: string
    phoneNumber: string
    password: string
    passwordConfirmation: string
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement?: string
  }
}
