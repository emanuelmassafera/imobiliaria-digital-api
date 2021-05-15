import { makeLoadPropertyByIdValidation, makeLogControllerDecorator, makeDbLoadPropertyById } from '@/main/factories'
import { LoadOwnerPropertyByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadOwnerPropertyByIdController = (): Controller => {
  const controller = new LoadOwnerPropertyByIdController(makeLoadPropertyByIdValidation(), makeDbLoadPropertyById())
  return makeLogControllerDecorator(controller)
}
