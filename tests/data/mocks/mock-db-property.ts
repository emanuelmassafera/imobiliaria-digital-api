import { AddPropertyRepository } from '@/data/protocols'
import { mockPropertyModel } from '@/tests/domain/mocks'

export class AddPropertyRepositorySpy implements AddPropertyRepository {
  params: AddPropertyRepository.Params
  result = mockPropertyModel()

  async add (params: AddPropertyRepository.Params): Promise<AddPropertyRepository.Result> {
    this.params = params
    return this.result
  }
}
