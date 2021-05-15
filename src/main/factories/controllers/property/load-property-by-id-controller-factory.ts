import { makeLoadPropertyByIdValidation, makeLogControllerDecorator, makeDbLoadPropertyById } from '@/main/factories'
import { LoadPropertyByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPropertyByIdController = (): Controller => {
  const controller = new LoadPropertyByIdController(makeLoadPropertyByIdValidation(), makeDbLoadPropertyById())
  return makeLogControllerDecorator(controller)
}
