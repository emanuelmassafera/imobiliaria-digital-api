import { AddOwnerRepository } from '@/data/protocols'
import { mockOwnerModel } from '@/tests/domain/mocks'

export class AddOwnerRepositorySpy implements AddOwnerRepository {
  params: AddOwnerRepository.Params
  result = mockOwnerModel()

  async add (params: AddOwnerRepository.Params): Promise<AddOwnerRepository.Result> {
    this.params = params
    return this.result
  }
}
