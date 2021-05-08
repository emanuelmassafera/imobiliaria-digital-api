import { makeLogControllerDecorator, makeDbLoadProperties } from '@/main/factories'
import { LoadOwnerPropertiesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadOwnerPropertiesController = (): Controller => {
  const controller = new LoadOwnerPropertiesController(makeDbLoadProperties())
  return makeLogControllerDecorator(controller)
}
