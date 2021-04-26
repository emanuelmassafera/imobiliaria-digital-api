import { makeDbAuthentication, makeRegisterOwnerValidation, makeLogControllerDecorator, makeDbAddOwner } from '@/main/factories'
import { RegisterOwnerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeRegisterOwnerController = (): Controller => {
  const controller = new RegisterOwnerController(makeRegisterOwnerValidation(), makeDbAddOwner(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
