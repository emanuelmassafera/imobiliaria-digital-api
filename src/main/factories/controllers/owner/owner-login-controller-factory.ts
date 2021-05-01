import { makeDbAuthentication, makeOwnerLoginValidation, makeLogControllerDecorator } from '@/main/factories'
import { OwnerLoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeOwnerLoginController = (): Controller => {
  const controller = new OwnerLoginController(makeOwnerLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
