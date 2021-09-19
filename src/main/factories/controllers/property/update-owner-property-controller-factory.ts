import { makeUpdatePropertyValidation, makeLogControllerDecorator, makeDbUpdateProperty } from '@/main/factories'
import { UpdateOwnerPropertyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateOwnerPropertyController = (): Controller => {
  const controller = new UpdateOwnerPropertyController(makeUpdatePropertyValidation(), makeDbUpdateProperty())
  return makeLogControllerDecorator(controller)
}
