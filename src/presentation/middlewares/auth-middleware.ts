import { LoadOwnerByToken } from '@/domain/usecases'
import { ok, serverError, unauthorized } from '@/presentation/helpers'
import { Middleware, HttpResponse } from '@/presentation/protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadOwnerByToken: LoadOwnerByToken
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const owner = await this.loadOwnerByToken.load(accessToken)
        if (owner) {
          return ok({ ownerId: owner.id })
        }
      }
      return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
