import { AddProperty } from '@/domain/usecases'
import { mockPropertyModel } from '@/tests/domain/mocks'

export class AddPropertySpy implements AddProperty {
  params: AddProperty.Params
  result = mockPropertyModel()

  async add (params: AddProperty.Params): Promise<AddProperty.Result> {
    this.params = params
    return this.result
  }
}
