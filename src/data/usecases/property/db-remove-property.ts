import { RemovePropertyRepository } from '@/data/protocols'
import { RemoveProperty } from '@/domain/usecases'

export class DbRemoveProperty implements RemoveProperty {
  constructor (
    private readonly removePropertyRepository: RemovePropertyRepository
  ) {}

  async remove (params: RemoveProperty.Params): Promise<RemoveProperty.Result> {
    await this.removePropertyRepository.removeProperty(params)
  }
}
