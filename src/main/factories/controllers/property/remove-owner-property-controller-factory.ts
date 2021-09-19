import { makeRemovePropertyValidation, makeLogControllerDecorator, makeDbRemoveProperty } from '@/main/factories'
import { RemoveOwnerPropertyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeRemoveOwnerPropertyController = (): Controller => {
  const controller = new RemoveOwnerPropertyController(makeRemovePropertyValidation(), makeDbRemoveProperty())
  return makeLogControllerDecorator(controller)
}
