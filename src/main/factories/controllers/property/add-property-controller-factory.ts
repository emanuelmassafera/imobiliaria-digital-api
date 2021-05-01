import { makeAddPropertyValidation, makeLogControllerDecorator, makeDbAddProperty } from '@/main/factories'
import { AddPropertyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddPropertyController = (): Controller => {
  const controller = new AddPropertyController(makeAddPropertyValidation(), makeDbAddProperty())
  return makeLogControllerDecorator(controller)
}
