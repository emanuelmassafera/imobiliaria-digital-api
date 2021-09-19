import { AddPropertyRepository, LoadPropertiesRepository, LoadPropertyByIdRepository, RemovePropertyRepository } from '@/data/protocols'
import { mockPropertyModel, mockPropertyModels } from '@/tests/domain/mocks'

export class AddPropertyRepositorySpy implements AddPropertyRepository {
  params: AddPropertyRepository.Params
  result: AddPropertyRepository.Result = mockPropertyModel()

  async add (params: AddPropertyRepository.Params): Promise<AddPropertyRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadPropertiesRepositorySpy implements LoadPropertiesRepository {
  params: LoadPropertiesRepository.Params
  result: LoadPropertiesRepository.Result = mockPropertyModels()

  async loadProperties (params: LoadPropertiesRepository.Params): Promise<LoadPropertiesRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadPropertyByIdRepositorySpy implements LoadPropertyByIdRepository {
  params: LoadPropertyByIdRepository.Params
  result: LoadPropertyByIdRepository.Result = mockPropertyModel()

  async loadPropertyById (params: LoadPropertyByIdRepository.Params): Promise<LoadPropertyByIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class RemovePropertyRepositorySpy implements RemovePropertyRepository {
  params: RemovePropertyRepository.Params

  async removeProperty (params: RemovePropertyRepository.Params): Promise<RemovePropertyRepository.Result> {
    this.params = params
  }
}
