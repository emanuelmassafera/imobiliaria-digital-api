import { AddPropertyRepository, LoadPropertiesRepository } from '@/data/protocols'
import { mockPropertyModel, mockPropertyModels } from '@/tests/domain/mocks'

export class AddPropertyRepositorySpy implements AddPropertyRepository {
  params: AddPropertyRepository.Params
  result = mockPropertyModel()

  async add (params: AddPropertyRepository.Params): Promise<AddPropertyRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadPropertiesRepositorySpy implements LoadPropertiesRepository {
  params: LoadPropertiesRepository.Params
  result = mockPropertyModels()

  async loadProperties (params: LoadPropertiesRepository.Params): Promise<LoadPropertiesRepository.Result> {
    this.params = params
    return this.result
  }
}
