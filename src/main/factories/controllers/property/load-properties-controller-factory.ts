import { makeLogControllerDecorator, makeDbLoadProperties } from '@/main/factories'
import { LoadPropertiesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadPropertiesController = (): Controller => {
  const controller = new LoadPropertiesController(makeDbLoadProperties())
  return makeLogControllerDecorator(controller)
}
