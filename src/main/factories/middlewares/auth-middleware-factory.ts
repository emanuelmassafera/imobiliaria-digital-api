import { makeDbLoadOwnerByToken } from '@/main/factories'
import { AuthMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadOwnerByToken())
}
