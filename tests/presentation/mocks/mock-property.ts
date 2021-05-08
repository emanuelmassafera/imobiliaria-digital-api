import { AddProperty, LoadProperties } from '@/domain/usecases'
import { mockPropertyModel, mockPropertyModels } from '@/tests/domain/mocks'

export class AddPropertySpy implements AddProperty {
  params: AddProperty.Params
  result = mockPropertyModel()

  async add (params: AddProperty.Params): Promise<AddProperty.Result> {
    this.params = params
    return this.result
  }
}

export class LoadPropertiesSpy implements LoadProperties {
  params: LoadProperties.Params
  result = mockPropertyModels()

  async loadProperties (params: LoadProperties.Params): Promise<LoadProperties.Result> {
    this.params = params
    return this.result
  }
}
