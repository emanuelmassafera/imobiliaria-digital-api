import { AddPropertyRepository } from '@/data/protocols'
import { AddProperty } from '@/domain/usecases'

export class DbAddProperty implements AddProperty {
  constructor (
    private readonly addPropertyRepository: AddPropertyRepository
  ) {}

  async add (params: AddProperty.Params): Promise<AddProperty.Result> {
    const property = await this.addPropertyRepository.add(params)
    return property
  }
}
